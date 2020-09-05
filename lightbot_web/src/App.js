import React, { useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'


import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/scss/now-ui-dashboard.scss?v1.4.0'
import './assets/css/now-ui-kit.css'

import Home from './layouts/Home.js'
import Landing from './layouts/Landing.js'
import { Provider } from 'react-redux'
import store from './store'
import { getMe, logout } from './actions/auth'
import setCookie from './services/setCookie.js'
import Cookies from 'universal-cookie'
import ErrorPage from './views/landing.views/ErrorPage'

const cookies = new Cookies()

const hist = createBrowserHistory()

const App = () => {
  useEffect(() => {
    setCookie(cookies.get('token'))
    if(cookies.get('token'))
      store.dispatch(getMe())
    else
      store.dispatch(logout())
  }, [])

  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Landing} />
          <Route exact path='/register' component={Landing} />
          <Route exact path='/recovery' component={Landing} />
          <Route exact path='/aboutus' component={Landing} />
          <Route path='/reset' component={Landing} />
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/home/overview' component={Home} />
          <Route exact path='/home/simulation' component={Home} />
          <PrivateRoute exact path='/home/configuration' component={Home} />
          <PrivateRoute exact path='/home/forum' component={Home} />
          <PrivateRoute exact path='/home/notifications' component={Home} />
          <PrivateRoute exact path='/home/profile' component={Home} />
          <PrivateRoute exact path='/home/users' component={Home} />
          <PrivateRoute exact path='/404' component={ErrorPage} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
