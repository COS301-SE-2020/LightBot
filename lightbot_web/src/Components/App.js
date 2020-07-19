import React, {Component} from 'react'
import './App.css'
import Landing from './Landing/Landing'
import '../Assets/scss/black-dashboard-react.scss'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'

class App extends Component {
  render() {
    //some function to get authkey and verify session
    //let current = (!cookies.get('User_name'))?Entrance:Home
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Landing} />
          <Route exact path='/404' component={Error} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    )
  }
}

export default App
