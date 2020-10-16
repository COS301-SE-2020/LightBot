// // Library imports
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

// // Model imports
const {
  ErrorResponse,
  BadRequest,
  NotFound,
} = require('../../models/Error.model')
const { SuccessResponse } = require('../../models/Success.model')
const Forum = require('../../models/Forum.model')
const User = require('../../models/User.model')
const Graph = require('../../models/Graph.model')

// // Service imports
const formatter = require('../../services/DataFormatter.service')

module.exports = {
  getGraphData: asyncHandler(async (req, res, next) => {
    const info = req.params.info
    res.json(
      new SuccessResponse('Successfully acquired graph data.', 'Graph data set')
    )
  }),

  getForumData: asyncHandler(async (req, res, next) => {
    let posts
    try {
      posts = await Forum.find({})
    } catch (err) {
      return next(new ErrorResponse('Fetching posts failed.'))
    }
    res.json(
      new SuccessResponse(
        'Successfully obtained forum posts.',
        posts.map((post) => post.toObject({ getters: true }))
      )
    )
  }),

  getStateData: asyncHandler(async (req, res, next) => {
    res.json(
      new SuccessResponse('Successfully acquired state data.', 'State data set')
    )
  }),

  addForumData: asyncHandler(async (req, res, next) => {
    const { title, subject, description } = req.body
    const { User_id, User_email } = req.User_data
    const createForumPost = new Forum({
      title,
      subject,
      description,
      creator: User_id,
    })
    let user
    try {
      user = await User.findOne({ User_email: User_email })
    } catch (err) {
      return next(
        new ErrorResponse('Creating forum post failed. Please try again.')
      )
    }
    if (!user) {
      return next(
        new ErrorResponse('Creating forum post failed. Please try again.')
      )
    }
    try {
      const session = await mongoose.startSession()
      session.startTransaction()
      await createForumPost.save({ session: session })
      user.ForumPosts.push(createForumPost)
      await user.save({ session: session })
      await session.commitTransaction()
    } catch (err) {
      return next(
        new ErrorResponse('Creating forum post failed. Please try again1.')
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
    let choice
    try {
      choice = await Forum.findById(postId)
    } catch (err) {
      return next(new ErrorResponse('Something went wrong could not update.'))
    }
    choice.title = title
    choice.message = message

    try {
      await choice.save()
    } catch (err) {
      return next(new ErrorResponse('Something went wrong could not update.'))
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
      return next(new ErrorResponse('Something went wrong could not delete.'))
    }
    try {
      await choice.remove()
    } catch (err) {
      return next(new ErrorResponse('Something went wrong could not delete.'))
    }
    res.json(
      new SuccessResponse(
        'Successfully deleted forum post.',
        req.params.forumpostid
      )
    )
  }),
  returnUsers: asyncHandler(async (req, res, next) => {
    let users
    try {
      users = await User.find(
        {},
        '-User_password -User_email -date -_id -ForumPosts'
      )
    } catch (err) {
      return next(new ErrorResponse('Fetching users failed.'))
    }
    res.json(
      new SuccessResponse(
        'Successfully acquired user list.',
        users.map((user) => user.toObject({ getters: true }))
      )
    )
  }),
  elevateUser: asyncHandler(async (req, res, next) => {
    const info = req.params.info
    const pos = info.substr(0, info.length - 1)
    const type = info.substr(info.length - 1)

    let users
    try {
      users = await User.find({})
      users[pos].User_role = type
      await users[pos].save()
    } catch (err) {
      return next(new ErrorResponse('Failed to change user privilege.'))
    }
    res.json(
      new SuccessResponse(
        'Successfully changed user privilege.'
        //users.map((user) => user.toObject({ getters: true }))
      )
    )
  }),
  pushData: asyncHandler(async (req, res, next) => {
    try {
      formatter.loadData()
    } catch (err) {
      return next(new ErrorResponse('Data load failed.'))
    }
    res.json(new SuccessResponse('Successfully loaded data.'))
  }),
  pullData: asyncHandler(async (req, res, next) => {
    let AutoQueueDux
    let AutoQueueSou
    let AutoWaitDux
    let AutoWaitSou
    let AutoEmissionTot
    let AutoFuelTot
    let ManQueueDux
    let ManQueueSou
    let ManWaitDux
    let ManWaitSou
    let ManEmissionTot
    let ManFuelTot

    try {
      AutoQueueDux = await Graph.findOne({ title: "Duxbury", type: "Automatic", metric: "Queue"}).sort({date: -1});
      AutoQueueSou = await Graph.findOne({ title: "South", type: "Automatic", metric: "Queue"}).sort({date: -1});
      AutoWaitDux = await Graph.findOne({ title: "Duxbury", type: "Automatic", metric: "Wait"}).sort({date: -1});
      AutoWaitSou = await Graph.findOne({ title: "South", type: "Automatic", metric: "Wait"}).sort({date: -1});
      AutoEmissionTot = await Graph.findOne({ title: "Total", type: "Automatic", metric: "Emissions"}).sort({date: -1});
      AutoFuelTot = await Graph.findOne({ title: "Total", type: "Automatic", metric: "Fuel"}).sort({date: -1});
      ManQueueDux = await Graph.findOne({ title: "Duxbury", type: "Manual", metric: "Queue"}).sort({date: -1});
      ManQueueSou = await Graph.findOne({ title: "South", type: "Manual", metric: "Queue"}).sort({date: -1});
      ManWaitDux = await Graph.findOne({ title: "Duxbury", type: "Manual", metric: "Wait"}).sort({date: -1});
      ManWaitSou = await Graph.findOne({ title: "South", type: "Manual", metric: "Wait"}).sort({date: -1});
      ManEmissionTot = await Graph.findOne({ title: "Total", type: "Manual", metric: "Emissions"}).sort({date: -1});
      ManFuelTot = await Graph.findOne({ title: "Total", type: "Manual", metric: "Fuel"}).sort({date: -1});
    } catch (err) {
      return next(new ErrorResponse('Data metrics failed to load.'))
    }
    const formData = {
        oneA: AutoQueueDux,
        twoA: AutoQueueSou,
        threeA: AutoWaitDux,
        fourA: AutoWaitSou,
        fiveA: AutoEmissionTot,
        sixA: AutoFuelTot,
        oneM: ManQueueDux,
        twoM: ManQueueSou,
        threeM: ManWaitDux,
        fourM: ManWaitSou,
        fiveM: ManEmissionTot,
        sixM: ManFuelTot,
    }
    res.json(new SuccessResponse('Data metrics loaded.',formData))
  }),
}
