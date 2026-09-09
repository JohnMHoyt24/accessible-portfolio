// One-off helper: node scripts/generate-admin-hash.js <password>
// Prints a bcrypt hash to put in ADMIN_PASSWORD_HASH (never commit the plaintext password).
const bcrypt = require("bcryptjs");

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/generate-admin-hash.js <password>");
  process.exit(1);
}

console.log(bcrypt.hashSync(password, 10));
