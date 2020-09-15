// // Library imports
const router = require('express').Router()

// // @route     Get live/:room
// // @desc      Live Room Route
// // @access    Public
router.get('/', require('../controllers/Live.controller').redirectRoom)

// // @route     Get live/:room
// // @desc      Live Room Route
// // @access    Public
router.get('/:room', require('../controllers/Live.controller').enterRoom)

module.exports = router