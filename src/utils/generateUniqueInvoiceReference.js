const crypto = require("crypto");

function generateUniqueString() {
  // Generate a random 5-digit number
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Ensures 5-digit number

  // Generate a random 7-character uppercase string
  const randomString = crypto
    .randomBytes(4) // Generates 4 random bytes (8 characters in hex, but we take 7)
    .toString("hex") // Convert to hexadecimal string
    .toUpperCase()
    .slice(0, 7); // Take only the first 7 characters

  return `${randomNumber}#${randomString}`;
}

module.exports = {generateUniqueString}
