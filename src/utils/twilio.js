const twilio = require("twilio");

const sendSmsOtp = async (toPhone, otp) => {
    
  const twilioSID = process.env.TWILIO_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const sender = process.env.TWILIO_SENDER_NUMBER;

  if (!twilioSID || !twilioAuthToken || !sender) {
    throw new Error("Twilio credentials are missing in environment variables");
  }

  const client = twilio(twilioSID, twilioAuthToken);

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: sender,
      to: toPhone,
    });
    return otp;
  } catch (error) {
    console.error("Twilio Error:", error); // Debugging
    throw new Error(error.message);
  }
};

module.exports = { sendSmsOtp }; // CommonJS export
