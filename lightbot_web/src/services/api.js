import axios from 'axios'
import { LOGOUT } from '../actions/types'
import store from '../store'

const api = axios.create({
  // baseURL: 'https://api.lightbot.co.za:8000/',
  baseURL: 'http://localhost:8000/',
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
