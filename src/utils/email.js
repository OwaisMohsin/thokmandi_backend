const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];

apiKey.apiKey = process.env.BREVO_API_KEY;

const sendMail = async (options) => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    const sendSmtpEmail = {
      sender: {
        name: 'ThokMandee',
        email: 'testing@cactusmoments.com', // Store sender email in .env
      },
      to: [
        {
          email: options.email,
        },
      ],
      subject: options.subject,
      htmlContent: options.message, // Use HTML content for better formatting
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendMail;
