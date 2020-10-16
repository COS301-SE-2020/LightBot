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
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
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
} from '../actions/types'

import cookies from 'universal-cookie'
const cookie = new cookies()

const initialState = {
  token: cookie.get('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  message: null,
  forum_data: null,
  user_list: null,
  data: null,
  scenario_data: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case REGISTER_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: true,
        message: { status: payload.status, msg: payload.message },
        token: payload.data.Auth_key,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case UPDATE_IMAGE_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case RECOVERY_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case RECOVERY_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case RESET_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case RESET_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        message: { status: payload.status, msg: payload.message },
        user: payload.data,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        message: { status: payload.status, msg: payload.message },
        user: null,
      }
    case GET_FORUM_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        forum_data: payload.data,
      }
    case GET_FORUM_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case GET_USERS_SUCCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        user_list: payload.data,
      }
    case GET_USERS_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case SEND_POST_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case SEND_POST_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case ELEVATE_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case ELEVATE_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case SIMULATION_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case SIMULATION_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
      case PUSH_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    case PUSH_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
      case PULL_SUCCESS:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
        scenario_data: payload.data,
      }
    case PULL_FAIL:
      return {
        ...state,
        message: { status: payload.status, msg: payload.message },
      }
    default:
      return state
  }
}
