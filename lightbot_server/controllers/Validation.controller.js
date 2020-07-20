const { validationResult } = require('express-validator')
const { BadRequest } = require('../utils/Error.util')

module.exports = {
  validate: async (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push({ [err.param]: err.msg }))

    return next(new BadRequest('Bad Request', extractedErrors))
  }
}