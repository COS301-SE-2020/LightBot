// // Library imports
const router = require('express').Router()

// // Service imports
const auth = require('../../services/Guard.service')

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

// // @route     GET data/state
// // @desc      State Data Route
// // @access    Private
router.get(
  '/state',
  auth.Guard,
  require('../controllers/Data.controller').getStateData
)

// // @route     POST data/post-forum
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

// // @route     GET user/list-user
// // @desc      List User Route
// // @access    Private
router.get(
  '/list-user',
  auth.Guard,
  require('../controllers/Data.controller').returnUsers
)

// // @route     GET user/list-user
// // @desc      List User Route
// // @access    Private
router.get(
  '/elevate/:info',
  auth.Guard,
  require('../controllers/Data.controller').elevateUser
)

// // @route     GET user/list-user
// // @desc      List User Route
// // @access    Private
router.get(
  '/push',
  auth.Guard,
  require('../controllers/Data.controller').pushData
)

// // @route     GET user/list-user
// // @desc      List User Route
// // @access    Private
router.get(
  '/pull',
  auth.Guard,
  require('../controllers/Data.controller').pullData
)

module.exports = router
