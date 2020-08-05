import api from '../services/api.js'
// import { setAlert } from './alert'
// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   USER_LOADED,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
// } from './types'

// Load User
// export const loadUser = () => async (dispatch) => {
//   try {
//     const res = await api.get('/auth')

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     })
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR
//   }
// }

// Register User
export const register = (formData) => async () => {
  try {
    const res = await api.post('/users', formData)
    //setCookie(res.data) ?
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach()
    }
  }
}

// Login User
export const login = (email, password) => async () => {
  const body = { email, password }

  try {
    const res = await api.post('/users', body)
    //setCookie(res.data) ?
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach()
    }
  }
}

// Logout
export const logout = () => {}
