const express = require('express')
const router = express.Router()
const { NotFound } = require('../utils/Error.util')

// @route     Error undefined route
// @desc      Not Found
// @access    N/A
router.use('/', (req, res, next) => {
  next(new NotFound("Resource not found"))
})

module.exports = router