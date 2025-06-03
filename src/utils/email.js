// const SibApiV3Sdk = require('sib-api-v3-sdk');
// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications['api-key'];

// apiKey.apiKey = process.env.BREVO_API_KEY;

// const sendMail = async (options) => {
//   try {
//     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
//     const sendSmtpEmail = {
//       sender: {
//         name: 'ThokMandee',
//         email: 'testing@cactusmoments.com',
//       },
//       to: [
//         {
//           email: options.email,
//         },
//       ],
//       subject: options.subject,
//       htmlContent: options.message,
//     };

//     const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log('Email sent successfully:', response);
//     return response;
//   } catch (error) {
//     console.error('Error sending email:', error.response?.data || error);
//     throw new Error('Failed to send email');
//   }
// };

// module.exports = sendMail;

// module imports
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const smtpTransport = nodemailer.createTransport({
    // service: 'gmail',
    host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  });

  const mailOptions = {
    // from: `No reply <${process.env.SMTP_EMAIL}>`,
    // from:'',
    to: options.email,
    subject:options.subject,
    html:options.message
  };

  await smtpTransport.sendMail(mailOptions)

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (response){
    console.log("Email send successfully!")
     return true
    } 
    return console.error('Error sending email:', error);
  });
};

module.exports = sendEmail; 
