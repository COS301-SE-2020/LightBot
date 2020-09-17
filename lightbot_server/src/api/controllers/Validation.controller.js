// // Library imports
const { validationResult } = require('express-validator')

// // Model imports
const { BadRequest } = require('../../models/Error.model')

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