const router = require('express').Router()
const rules = require('../middleware/UserValidation.handler')
const resolve = require('../controllers/Validation.controller')
const auth = require('../middleware/Guard.handler')

// // @route     POST user/register
// // @desc      User Registration Route
// // @access    Public
router.post(
  '/register',
  rules('registerUser'),
  resolve.validate,
  require('../controllers/User.controller').registerUser
)

// @route     POST user/login
// @desc      User Login Route
// @access    Public
router.post(
  '/login',
  rules('loginUser'),
  resolve.validate,
  require('../controllers/User.controller').loginUser
)

// @route     GET user/logout
// @desc      User Logout Route
// @access    Private
router.get(
  '/logout',
  auth.Guard,
  require('../controllers/User.controller').logoutUser
)

// // @route     PUT user/update-details
// // @desc      Update User Pass Route
// // @access    Private
router.put(
  '/update-details',
  auth.Guard,
  require('../controllers/User.controller').updateUserDetails
)

// // @route     PUT user/update-image
// // @desc      Update User Image Route
// // @access    Private
router.put(
  '/update-image',
  auth.Guard,
  require('../controllers/User.controller').updateUserImage
)

// // @route     PUT user/update-details
// // @desc      Update User Pass Route
// // @access    Private
router.put(
  '/update-password',
  auth.Guard,
  require('../controllers/User.controller').updateUserPass
)

// // @route     POST user/recover-password
// // @desc      Recover User Password Route
// // @access    Public
router.post(
  '/recover-password',
  require('../controllers/User.controller').recoverUserPass
)

// // @route     PUT user/reset-password
// // @desc      Reset User Password Route
// // @access    Private
router.put(
  '/reset-password/:passresetid',
  require('../controllers/User.controller').resetUserPass
)

// // @route     DELETE user/delete
// // @desc      Delete Route
// // @access    Private
router.delete(
  '/delete',
  auth.Guard,
  require('../controllers/User.controller').deleteUser
)

// // @route     GET user/delete
// // @desc      List User Route
// // @access    Private
router.get(
  '/list-user',
  auth.Guard,
  require('../controllers/User.controller').returnUsers
)

// // @route     GET user/profile
// // @desc      List User Route
// // @access    Private
router.get(
  '/me',
  auth.Guard,
  require('../controllers/User.controller').returnProfile
)
module.exports = router
