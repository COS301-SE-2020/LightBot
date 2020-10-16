// // Config imports
const config = require('../config')

// // Library imports
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

// // Model imports
const { Unauthorized } = require('../models/Error.model')

module.exports = {
  Guard: asyncHandler(async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return next(new Unauthorized('Authentication failed.'))
      }
      const decoded = jwt.verify(token, config.appSecret)
      req.User_data = {
        User_id: decoded.user.id,
        User_email: decoded.user.User_email,
      }
      next()
    } catch (err) {
      {
        return next(new Unauthorized('Authentication failed.'))
      }
    }
  }),
}
