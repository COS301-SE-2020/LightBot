import React, { Component } from 'react'
import './App.css'
import './Assets/scss/black-dashboard-react.scss'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
// import { Provider } from 'react-redux'
import DashboardPage from './Pages/DashboardPage/DashboardPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import RecoverPage from './Pages/RecoverPage/RecoverPage'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import ResetPage from './Pages/ResetPage/ResetPage'
// import store from './store'

class App extends Component {
  render() {
    // let current = ResetPage
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={ResetPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={SignUpPage} />
            <Route exact path='/recover' component={RecoverPage} />
            <Route exact path='/reset' component={ResetPage} />
            <Route exact path='/dashboard' component={DashboardPage} />
            <Route exact path='/404' component={ErrorPage} />
            <Redirect to='/404' />
          </Switch>
        </Router>
    )
  }
}

export default App
