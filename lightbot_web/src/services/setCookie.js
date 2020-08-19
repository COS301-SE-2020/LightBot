import api from './api'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const setCookie = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = 'Beaer ' + token
    cookies.set('token', token,{ path: '/' })
  } else {
    delete api.defaults.headers.common['Authorization']
    cookies.remove('token',{ path: '/' },"localhost")
  }
}

export default setCookie
