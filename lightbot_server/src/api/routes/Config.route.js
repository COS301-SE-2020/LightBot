// // Library imports
const router = require('express').Router()

// // Service imports
const auth = require('../../services/Guard.service')

// // @route     GET config/run
// // @desc      Graph Data Route
// // @access    Private
router.get(
  '/run/:id',
  auth.Guard,
  require('../controllers/Config.controller').runSimulation
)

module.exports = router
