import api from './api'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

const setCookie = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token
    cookies.set('token', token)
  } else {
    delete api.defaults.headers.common['x-auth-token']
    cookies.remove('token')
  }
}

export default setCookie
