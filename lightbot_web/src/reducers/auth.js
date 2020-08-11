import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  RECOVERY_SUCCESS,
  RECOVERY_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_IMAGE_FAIL,
  GET_FORUM_SUCCESS,
  GET_FORUM_FAIL,
} from '../actions/types'

import cookies from 'universal-cookie'
const cookie = new cookies()

const initialState = {
  token: cookie.get('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  message: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case REGISTER_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: true,
        loading: true,
        user: payload.data,
        token: payload.data.Auth_key,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    case AUTH_ERROR:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    case RECOVERY_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case RECOVERY_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case RESET_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case RESET_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: false,
        loading: false,
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        message: {
          status: payload.success.status,
          msg: payload.success.message,
        },
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: true,
        loading: false,
      }

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: true,
        loading: false,
      }
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: true,
        loading: false,
      }
    case UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        message: {
          status: payload.success.status,
          msg: payload.success.message,
        },
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case UPDATE_IMAGE_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        isAuthenticated: true,
        loading: false,
      }
    case GET_FORUM_SUCCESS:
      return {
        ...state,
        message: {
          status: payload.success.status,
          msg: payload.success.message,
        },
        loading: true,
        data: payload.data.data,
      }
    case GET_FORUM_FAIL:
      return {
        ...state,
        message: {
          status: payload.status,
          msg: payload.message,
        },
        loading: false,
      }
    default:
      return state
  }
}
