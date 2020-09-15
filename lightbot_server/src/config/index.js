// // dotenv import and load of .env vars
require('dotenv').config({ path: './src/config/config.vars.env' })

// Set NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Exports for environment variables
module.exports = {
    port: parseInt(process.env.PORT, 10),
    dbURI: process.env.MONGODB_URI,
    appSecret: process.env.APPSECRET,
    jwtExpiry: process.env.JWTEXP,
    mailEntity: process.env.MAIL_ENTITY,
    mailFrom: process.env.MAIL_FROM,
    mailDomain: process.env.MAIL_DOMAIN,
    mailPassword: process.env.MAIL_PASSWORD,
}