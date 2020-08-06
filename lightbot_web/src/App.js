import React, { useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/scss/now-ui-dashboard.scss?v1.4.0'
import './assets/css/now-ui-kit.css'

import Home from './layouts/Home.js'
import Landing from './layouts/Landing.js'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setCookie from './services/setCookie.js'
import Cookies from 'universal-cookie'
import ErrorPage from './views/landing.views/ErrorPage'

const cookies = new Cookies()

const hist = createBrowserHistory()

const App = () => {
  useEffect(() => {
    setCookie(cookies.get('token'))
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/' component={Landing} />
          <Route path='/404' component={ErrorPage} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
