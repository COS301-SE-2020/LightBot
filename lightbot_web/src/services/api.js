import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => {
    console.log(res.data)
    return res
  },
  (err) => {
    if (err.response.data.error.message === 'Authentication failed.') {
      console.log("here")
      //store.dispatch({ type: LOGOUT })
    }
    return Promise.reject(err)
  }
)

export default api
