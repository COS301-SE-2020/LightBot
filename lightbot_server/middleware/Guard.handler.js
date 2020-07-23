const asyncHandler = require('express-async-handler')
const { BadRequest, ErrorResponse, Unauthorized } = require('../utils/Error.util')
const jwt = require('jsonwebtoken')

module.exports = {
  Guard: asyncHandler(async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return next(new Unauthorized('Authentication failed.'))
      }
      const decoded = jwt.verify(token, process.env.AppSecret)
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
