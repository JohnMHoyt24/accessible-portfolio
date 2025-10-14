require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(cors());
app.use(express.json());

let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (!resend) {
      console.log('Contact form submission received:', { name, email, subject, message });
      return res.status(200).json({ 
        success: true, 
        message: 'Form received! (Email service not configured - add RESEND_API_KEY to enable email sending)' 
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
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || 'jmhoyt6355@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

app.listen(PORT, 'localhost', () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️  RESEND_API_KEY not found - email sending is disabled');
    console.log('   Add RESEND_API_KEY secret to enable email functionality');
  }
});
