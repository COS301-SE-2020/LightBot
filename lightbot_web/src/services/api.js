import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.error.message === 'Authentication failed.') {
      // store.dispatch({ type: LOGOUT })
    }
    return Promise.reject(err)
  }
)

export default api
