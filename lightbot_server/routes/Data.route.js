const express = require('express')
const router = express.Router()
const auth = require('../middleware/Guard.handler')

// // @route     GET data/graph
// // @desc      Graph Data Route
// // @access    Private
router.get(
  '/graph',
  auth.Guard,
  require('../controllers/Data.controller').getGraphData
)

// // @route     GET data/forum
// // @desc      Forum Data Route
// // @access    Private
router.get(
    '/forum',
    auth.Guard,
    require('../controllers/Data.controller').getForumData
  )

// // @route     GET data/notification
// // @desc      Notification Data Route
// // @access    Private
router.get(
    '/notification',
    auth.Guard,
    require('../controllers/Data.controller').getNotificationData
  )

// // @route     GET data/state
// // @desc      State Data Route
// // @access    Private
router.get(
    '/state',
    auth.Guard,
    require('../controllers/Data.controller').getStateData
  )

// // @route     POST data/state
// // @desc      Update Forum Route
// // @access    Private
router.post(
  '/post-forum',
  auth.Guard,
  require('../controllers/Data.controller').addForumData
)

// // @route     PATCH data/state
// // @desc      Update Forum Route
// // @access    Private
router.patch(
  '/post-forum/:forumpostid',
  auth.Guard,
  require('../controllers/Data.controller').updateForumData
)

// // @route     DELETE data/state
// // @desc      Update Forum Route
// // @access    Private
router.delete(
  '/delete-forum/:forumpostid',
  auth.Guard,
  require('../controllers/Data.controller').deleteForumData
)

module.exports = router
