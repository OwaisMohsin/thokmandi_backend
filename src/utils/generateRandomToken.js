const crypto = require("crypto");

exports.generateRandomToken = async () => {
  const plainToken = crypto.randomBytes(24).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  return { plainToken, hashedToken };
};


