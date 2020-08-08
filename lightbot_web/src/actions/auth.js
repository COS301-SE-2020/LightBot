import api from '../services/api'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RECOVERY_SUCCESS,
  RECOVERY_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
} from './types'

const stderr = { status: 500, message: 'Internal Server Error' }
// Load User
export const getMe = () => async (dispatch) => {
  try {
    const res = await api.get('/user/me')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

// // Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/user/register', formData)

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

// // Login User
export const loginUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/user/login', formData)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.success,
    })
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response ? err.response.data.error : stderr,
    })
  }
}

export const reset = (formData, token) => async (dispatch) => {
  try {
    const res = await api.put('/user/reset-password/' + token, formData)
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

export const recovery = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/user/recover-password', formData)
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

// // Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
}
