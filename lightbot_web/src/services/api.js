import axios from 'axios'
import {LOGOUT} from '../actions/types'
import store from '../store'

const api = axios.create({
  baseURL: 'http://ec2-18-157-183-138.eu-central-1.compute.amazonaws.com:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.error.message === 'Authentication failed.') {
      store.dispatch({ type: LOGOUT })
    }
    return Promise.reject(err)
  }
)

export default api
