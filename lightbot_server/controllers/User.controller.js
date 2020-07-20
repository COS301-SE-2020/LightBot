const asyncHandler = require('express-async-handler')
const { BadRequest } = require('../utils/Error.util')
const { SuccessResponse } = require('../utils/Success.util')
const User = require('../models/User.model')

module.exports = {
  registerUser: asyncHandler(async (req, res, next) => {
    const { User_name, User_surname, User_email, User_password } = req.body
    let existing
    try{
      existing = await User.findOne({User_email:User_email})
    }
    catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not register user.')
      )
    }
    if(existing)
    {
      return next(
        new ErrorResponse('User already exists please sign in.')
      )
    }

    let hashedPassword;
    bcrypt.hash
    const createdUser = new User({
      User_name,
      User_surname,
      User_email,
      User_password,
      ForumPosts: []
    })
    try{
      await createdUser.save()
    }
    catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not register user.')
      )
    }
    let token;
    try{
      token = createdUser.getJWT()
    }
    catch(err)
    {
      return next(
        new ErrorResponse('Something went wrong could not register user')
      )
    }
    res.json(new SuccessResponse("User registration successful.",{user: createdUser.toObject({getters: true})}))
  }),

  loginUser: asyncHandler(async (req, res, next) => {
    const { User_email, User_password } = req.body
    let existing
    try{
      existing = await User.findOne({User_email:User_email})
    }
    catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not login user.')
      )
    }
    if(!existing)
    {
      return next(
        new ErrorResponse('Invalid credentials.')
      )
    }
    let isValidPassword = false
    try{
      isValidPassword = await existing.MatchPassword()
    }
    catch(err)
    {
      return next(
        new ErrorResponse('Something went wrong could not login user.')
      )
    }
    if(!isValidPassword)
    {
      return next(
        new ErrorResponse('Invalid credentials.')
      )
    }
    
    res.json(new SuccessResponse("User login successful.","User data"))
  }),

  logoutUser: asyncHandler(async (req, res, next) => {
    res.json(new SuccessResponse("Successfully signed out user.","Redirect sign in."))
  }),

  updateUserDetails: asyncHandler(async (req, res, next) => {
    res.json(new SuccessResponse("Successfully updated user details.","New user data"))
  }),

  updateUserPass: asyncHandler(async (req, res, next) => {
    res.json(new SuccessResponse("Successfully updated user password.","Miscellaneous"))
  }),

  recoverUserPass: asyncHandler(async (req, res, next) => {
    res.json(new SuccessResponse("If an account associated with this address exists, an email will be sent to it.","Miscellaneous"))
  }),

  resetUserPass: asyncHandler(async (req, res, next) => {
    res.json(new SuccessResponse("Successfully reset user password.",req.params.passresetid))
  }),

  deleteUser: asyncHandler(async (req, res, next) => {
    res.json(new SuccessResponse("Successfully removed user.","Redirect to sign in."))
  }),

  returnUsers: asyncHandler(async (req, res, next) => {
    let users
    try{
        users = await User.find({},'-User_password')
    }catch (err) {
      return next(
        new ErrorResponse('Fetching users failed.')
      )
    } 
    res.json(new SuccessResponse("Successfully removed user.",users.map(user => user.toObject({getters: true}))))
  }),
}
