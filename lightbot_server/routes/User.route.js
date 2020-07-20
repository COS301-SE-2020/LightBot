const router = require('express').Router()
const rules = require('../middleware/UserValidation.handler')
const resolve = require('../controllers/Validation.controller')

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
  require('../controllers/User.controller').logoutUser
)

// // @route     PUT user/update-details
// // @desc      Update User Details Route
// // @access    Private
router.put(
  '/update-details',
  require('../controllers/User.controller').updateUserDetails
)

// // @route     PUT user/update-password
// // @desc      Update User Password Route
// // @access    Private
router.put(
  '/update-password',
  require('../controllers/User.controller').updateUserPass
)

// // @route     PUT user/recover-password
// // @desc      Recover User Password Route
// // @access    Private
router.get(
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
router.delete('/delete', require('../controllers/User.controller').deleteUser)

// // @route     GET user/delete
// // @desc      List User Route
// // @access    Private
router.delete('/list-user', require('../controllers/User.controller').returnUsers)


module.exports = router
