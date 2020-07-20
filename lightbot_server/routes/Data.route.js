const express = require('express')
const router = express.Router()

// // @route     GET data/graph
// // @desc      Graph Data Route
// // @access    Public
router.get(
  '/graph',
  require('../controllers/Data.controller').getGraphData
)

// // @route     GET data/forum
// // @desc      Forum Data Route
// // @access    Public
router.get(
    '/forum',
    require('../controllers/Data.controller').getForumData
  )

// // @route     GET data/notification
// // @desc      Notification Data Route
// // @access    Public
router.get(
    '/notification',
    require('../controllers/Data.controller').getNotificationData
  )

// // @route     GET data/state
// // @desc      State Data Route
// // @access    Public
router.get(
    '/state',
    require('../controllers/Data.controller').getStateData
  )

// // @route     PUT data/state
// // @desc      Update Forum Route
// // @access    Private
router.post(
  '/post-forum/',
  require('../controllers/Data.controller').addForumData
)

// // @route     PUT data/state
// // @desc      Update Forum Route
// // @access    Private
router.patch(
  '/post-forum/:forumpostid',
  require('../controllers/Data.controller').updateForumData
)

// // @route     PUT data/state
// // @desc      Update Forum Route
// // @access    Private
router.delete(
  '/delete-forum/:forumpostid',
  require('../controllers/Data.controller').deleteForumData
)

module.exports = router
