// // Config imports
const config = require('../config')

// // Library imports
const nodemailer = require('nodemailer')

const Mailer = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailDomain,
      pass: config.mailPassword,
    },
  })

  const message = {
    from: `${config.mailEntity} <${config.mailFrom}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  const info = await transporter.sendMail(message)
  console.log(`Message sent: ${info.messageId}`.italic)
}

module.exports = Mailer