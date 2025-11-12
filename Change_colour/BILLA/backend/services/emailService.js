const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 *... (code truncated)
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"BILLA" <${process.env.EMAIL_USER}>`, 
      to: to, 
      subject: subject, 
      text: text, 
      html: html, 
    });

    console.log('Message sent: %s', info.messageId);
    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;

  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;