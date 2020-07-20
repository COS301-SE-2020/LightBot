const asyncHandler = require('express-async-handler')
const { ErrorResponse, BadRequest, NotFound } = require('../utils/Error.util')
const { SuccessResponse } = require('../utils/Success.util')
// const Graph = require('../models/Graph.model')
const Forum = require('../models/Forum.model')
const User = require('../models/User.model')
const UserController = require('./User.controller')
const mongoose = require('mongoose')
// const Notification = require('../models/Notification.model')
// const State = require('../models/State.model')

module.exports = {
  getGraphData: asyncHandler(async (req, res, next) => {
    res.json(
      new SuccessResponse('Successfully acquired graph data.', 'Graph data set')
    )
  }),

  getForumData: asyncHandler(async (req, res, next) => {
    res.json(
      new SuccessResponse('Successfully acquired forum data.', 'Forum data set')
    )
  }),

  getNotificationData: asyncHandler(async (req, res, next) => {
    res.json(
      new SuccessResponse(
        'Successfully acquired notification data.',
        'Notification data set'
      )
    )
  }),

  getStateData: asyncHandler(async (req, res, next) => {
    res.json(
      new SuccessResponse('Successfully acquired state data.', 'State data set')
    )
  }),

  addForumData: asyncHandler(async (req, res, next) => {
    const { title, message, creator } = req.body
    const createForumPost = new Forum({
      title,
      message,
      creator
    })
    let user
    try{
        user = await User.findById(creator)
    }catch(err)
    {
      return next(
        new ErrorResponse('Creating forum post failed. Please try again.')
      )
    }
    if(!user)
    {
      return next(
        new ErrorResponse('Creating forum post failed. Please try again.')
      )
    }
    try {
      const session = await mongoose.startSession()
      session.startTransaction()
      await createForumPost.save({session: session})
      user.ForumPosts.push(createForumPost)
      await user.save({session: session})
      await session.commitTransaction()
    } catch (err) {
      return next(
        new ErrorResponse('Creating forum post failed. Please try again.')
      )
    }
    res.json(
      new SuccessResponse(
        'Successfully submitted forum post.',
        'req.params.forumpostid'
      )
    )
  }),

  updateForumData: asyncHandler(async (req, res, next) => {
    const postId = req.params.forumpostid
    const { title, message } = req.body
    let choice;
    try {
      choice = await Forum.findById(postId)
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update.')
      )
    }
    choice.title = title
    choice.message = message

    try {
      await choice.save()
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not update.')
      )
    }

    res.json(
      new SuccessResponse(
        'Successfully updated forum post.',
        req.params.forumpostid
      )
    )
  }),

  deleteForumData: asyncHandler(async (req, res, next) => {
    const postId = req.params.forumpostid
    let choice
    try {
      choice = await Forum.findById(forumpostid)
    } catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not delete.')
      )
    }
    try{
      await choice.remove()
    }
    catch (err) {
      return next(
        new ErrorResponse('Something went wrong could not delete.')
      )
    }
    res.json(
      new SuccessResponse(
        'Successfully deleted forum post.',
        req.params.forumpostid
      )
    )
  }),
}
