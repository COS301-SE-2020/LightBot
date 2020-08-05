import React, { Fragment, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/scss/now-ui-dashboard.scss?v1.4.0'
import './assets/css/now-ui-kit.css'

import Home from './Layouts/Home.js'
import Landing from './Layouts/Landing.js'
import ErrorPage from './Layouts/ErrorPage.js'

//import { loadUser } from './actions/auth';
import setCookie from './services/setCookie.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const hist = createBrowserHistory()

ReactDOM.render(
  // useEffect(() => {
  //   setCookie(cookies.get('token'))
  // }), gave error
  <Router history={hist}>
    <Switch>
      <Route path='/landing' render={(props) => <Landing {...props} />} />
      <Route path='/home' render={(props) => <Home {...props} />} />
      <Route path='/404' render={(props) => <ErrorPage {...props} />} />
      <Redirect to='/404' />
    </Switch>
  </Router>,
  document.getElementById('root')
)
