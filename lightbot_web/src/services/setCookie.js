import api from './api'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

const setCookie = (token) => {
  if (token) {
    //api...
    cookies.set('token', token)
  } else {
    //api
    cookies.remove('token')
  }
}

export default setCookie
