const nodemailer = require('nodemailer');

const Mailer = async options => {
  const transporter = nodemailer.createTransport({
    // host: process.env.SmtpHost,
    // port: process.env.SmtpPort,
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  const message = {
    from: `${process.env.FromName} <${process.env.FromMail }>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log(`Message sent: ${info.messageId}`);
};

module.exports = Mailer;