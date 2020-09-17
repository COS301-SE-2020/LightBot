// // Library imports
const router = require('express').Router()

// // Model imports
const { NotFound } = require('../../models/Error.model')

// @route     Error undefined route
// @desc      Not Found
// @access    N/A
router.use('/', (req, res, next) => {
  next(new NotFound('Resource not found'))
})

module.exports = router
