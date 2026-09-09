require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(cors());
app.use(express.json());

let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// --- Admin auth + hidden tracks (used by the Recently Played dropdown) ---

const HIDDEN_TRACKS_FILE = path.join(__dirname, "data", "hidden-tracks.json");
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const sessions = new Map(); // token -> expiresAt

const readHiddenTracks = () => {
  try {
    const raw = fs.readFileSync(HIDDEN_TRACKS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeHiddenTracks = (ids) => {
  fs.mkdirSync(path.dirname(HIDDEN_TRACKS_FILE), { recursive: true });
  fs.writeFileSync(HIDDEN_TRACKS_FILE, JSON.stringify(ids, null, 2));
};

const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const expiresAt = token && sessions.get(token);

  if (!expiresAt || expiresAt < Date.now()) {
    if (token) sessions.delete(token);
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  next();
};

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body || {};
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    return res.status(503).json({
      success: false,
      message: "Admin login is not configured on the server.",
    });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  const usernameMatches = username === adminUsername;
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({ success: false, message: "Invalid username or password" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + SESSION_TTL_MS);

  res.json({ success: true, token });
});

app.post("/api/admin/logout", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) sessions.delete(token);
  res.status(204).end();
});

app.get("/api/hidden-tracks", (req, res) => {
  res.json({ hiddenIds: readHiddenTracks() });
});

app.post("/api/hidden-tracks", requireAdmin, (req, res) => {
  const { id } = req.body || {};
  if (typeof id !== "string" || !id) {
    return res.status(400).json({ success: false, message: "id is required" });
  }

  const hiddenIds = readHiddenTracks();
  if (!hiddenIds.includes(id)) {
    hiddenIds.push(id);
    writeHiddenTracks(hiddenIds);
  }

  res.json({ hiddenIds });
});

app.delete("/api/hidden-tracks/:id", requireAdmin, (req, res) => {
  const hiddenIds = readHiddenTracks().filter((hiddenId) => hiddenId !== req.params.id);
  writeHiddenTracks(hiddenIds);
  res.json({ hiddenIds });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!resend) {
      console.log("Contact form submission received:", {
        name,
        email,
        subject,
        message,
      });
      return res.status(200).json({
        success: true,
        message:
          "Form received! (Email service not configured - add RESEND_API_KEY to enable email sending)",
      });
    }

    const emailContent = `
      New Contact Form Submission
      
      From: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: "jmhoyt6355@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend server is running" });
});

app.listen(PORT, "localhost", () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  if (!process.env.RESEND_API_KEY) {
    console.log("⚠️  RESEND_API_KEY not found - email sending is disabled");
    console.log("   Add RESEND_API_KEY secret to enable email functionality");
  }
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD_HASH) {
    console.log("⚠️  ADMIN_USERNAME/ADMIN_PASSWORD_HASH not found - admin login is disabled");
    console.log("   Run `node scripts/generate-admin-hash.js <password>` to create ADMIN_PASSWORD_HASH");
  }
});
