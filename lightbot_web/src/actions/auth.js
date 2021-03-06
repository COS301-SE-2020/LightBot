import api from '../services/api'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_FAIL,
  RECOVERY_SUCCESS,
  RECOVERY_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  LOGOUT,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_FORUM_SUCCESS,
  GET_FORUM_FAIL,
  GET_USERS_SUCCCESS,
  GET_USERS_FAIL,
  SEND_POST_SUCCESS,
  SEND_POST_FAIL,
  // DELETE_ACCOUNT_SUCCESS,
  // DELETE_ACCOUNT_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ELEVATE_SUCCESS,
  ELEVATE_FAIL,
  SIMULATION_SUCCESS,
  SIMULATION_FAIL,
  PUSH_SUCCESS,
  PUSH_FAIL,
  PULL_SUCCESS,
  PULL_FAIL,
} from './types'

const stderr = { status: 500, message: 'Internal Server Error' }

// // @route     POST /user/register
// // @desc      Create a new User Profile
// // @access    Public
export const register = (form) => async (dispatch) => {
  try {
    const res = await api.post('/user/register', form)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     POST /user/login
// // @desc      Checks If Login Credentials Are Valid
// // @access    Public
export const login = (form) => async (dispatch) => {
  try {
    const res = await api.post('/user/login', form)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.success,
    })
    dispatch(getMe())
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     PUT /user/update-details
// // @desc      Updates Existing User Details
// // @access    Private
export const update_details = (form) => async (dispatch) => {
  try {
    const res = await api.put('/user/update-details', form)

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data.success,
    })
    dispatch(getMe())
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     PUT /user/update-password
// // @desc      Updates Existing User Password
// // @access    Private
export const update_pass = (form) => async (dispatch) => {
  try {
    const res = await api.put('/user/update-password', form)

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: res.data.success,
    })
    dispatch(getMe())
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     PUT /user/update-image
// // @desc      Updates Existing User Profile Image
// // @access    Private
export const update_image = (form) => async (dispatch) => {
  try {
    const res = await api.put('/user/update-image', form)

    dispatch({
      type: UPDATE_IMAGE_SUCCESS,
      payload: res.data.success,
    })
    dispatch(getMe())
  } catch (err) {
    dispatch({
      type: UPDATE_IMAGE_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     POST /user/recover-password
// // @desc      Send Email To Registered User With User Password Change Token
// // @access    Public
export const recovery = (form) => async (dispatch) => {
  try {
    const res = await api.post('/user/recover-password', form)

    dispatch({
      type: RECOVERY_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: RECOVERY_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     PUT /user/reset-password
// // @desc      Reset Exiting User Password using recovery token
// // @access    Public
export const reset = (form, token) => async (dispatch) => {
  try {
    const res = await api.put('/user/reset-password/' + token, form)

    dispatch({
      type: RESET_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: RESET_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
}

// // @route     GET /user/me
// // @desc      Acquires User Profile
// // @access    Private
export const getMe = () => async (dispatch) => {
  try {
    const res = await api.get('/user/me')

    await dispatch(pullData())
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     GET /data/forum
// // @desc      Acquires Forum Posts
// // @access    Private
export const getForum = () => async (dispatch) => {
  try {
    const res = await api.get('/data/forum')

    dispatch({
      type: GET_FORUM_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: GET_FORUM_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     GET /user/list-users
// // @desc      Acquires List Of Users
// // @access    Private
export const getUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/data/list-user')

    dispatch({
      type: GET_USERS_SUCCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     POST /data/post-forum
// // @desc      Create A Forum Post
// // @access    Private
export const sendForum = (form) => async (dispatch) => {
  try {
    const res = await api.post('/data/post-forum', form)

    dispatch({
      type: SEND_POST_SUCCESS,
      payload: res.data.success,
    })
    dispatch(getForum())
  } catch (err) {
    dispatch({
      type: SEND_POST_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     DELETE /data/delete-forum
// // @desc      Delete a Forum Post
// // @access    Private
export const delForum = (token) => async (dispatch) => {
  try {
    const res = await api.delete('/data/delete-forum/' + token)

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: res.data.success,
    })
    dispatch(getForum())
  } catch (err) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     GET /user/list-users
// // @desc      Acquires List Of Users
// // @access    Private
export const elevate = (key, type) => async (dispatch) => {
  try {
    const res = await api.get('/data/elevate/' + key + type)

    dispatch({
      type: ELEVATE_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: ELEVATE_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     GET /user/list-users
// // @desc      Acquires List Of Users
// // @access    Private
export const runSim = (v,d) => async (dispatch) => {
  try {
    const res = await api.get('/config/run/'+v+':'+d)

    dispatch({
      type: SIMULATION_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: SIMULATION_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}


// // @route     GET /user/list-users
// // @desc      Acquires List Of Users
// // @access    Private
export const pushData = () => async (dispatch) => {
  try {
    const res = await api.get('/data/push')

    dispatch({
      type: PUSH_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: PUSH_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // @route     GET /user/list-users
// // @desc      Acquires List Of Users
// // @access    Private
export const pullData = () => async (dispatch) => {
  try {
    const res = await api.get('/data/pull')

    dispatch({
      type: PULL_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: PULL_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}