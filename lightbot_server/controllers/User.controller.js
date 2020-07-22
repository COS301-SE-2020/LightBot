const asyncHandler = require('express-async-handler')
const { BadRequest, ErrorResponse, NotFound } = require('../utils/Error.util')
const { SuccessResponse } = require('../utils/Success.util')
const User = require('../models/User.model')
const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

SALT_WORK_FACTOR = 12

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
    
    const createdUser = new User({
      User_name,
      User_surname,
      User_email,
      User_password,
      ForumPosts: []
    })
    try{
      const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR)
      createdUser.User_password = await Bcrypt.hash(createdUser.User_password, salt)
      await createdUser.save()
    }
    catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not register user.')
      )
    }
    res.json(new SuccessResponse("User registration successful."))
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
        new NotFound('User does not exist, please sign up.')
      )
    }
    let isValidPassword = false
    try{
      isValidPassword = await Bcrypt.compare(User_password, existing.User_password)
    }
    catch(err)
    {
      return next(
        new ErrorResponse('Something went wrong could not login user.', err.body)
      )
    }
    if(!isValidPassword)
    {
      return next(
        new ErrorResponse('Invalid credentials.')
      )
    }
    let token;
    try{
      const payload = {
        user: {
           id: existing._id, 
           User_email: existing.User_email,
          }
      }
      token = jwt.sign(
        payload
        ,
        process.env.AppSecret,
        {
          expiresIn: process.env.ExpiryJWT,
        }
      )
    }
    catch(err)
    {
      return next(
        new ErrorResponse('Something went wrong could not register user')
      )
    }
    const data = {
      User_name: existing.User_name,
      User_surname: existing.User_surname,
      User_state: existing.User_state,
      User_role: existing.User_role,
      Auth_key: token,
    }
    res.json(new SuccessResponse("User login successful.",data))
  }),

  logoutUser: asyncHandler(async (req, res, next) => {
    //remove refrsh token from registry in next spring
    res.json(new SuccessResponse("Successfully signed out user.","Redirect sign in."))
  }),

  updateUserDetails: asyncHandler(async (req, res, next) => {
    //once sure of what data (files/images) update according to password update model
    res.json(new SuccessResponse("Successfully updated user details.","New user data"))
  }),

  updateUserPass: asyncHandler(async (req, res, next) => {
    const { User_password } = req.body
    const { User_id, User_email } = req.User_data
    let existing
    try{
      existing = await User.findOne({User_email:User_email})
    }
    catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update password.')
      )
    }


    res.json(new SuccessResponse("Successfully updated user password."))
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
