// Importing Libraries
import React from 'react'
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// Importing Styles
import './App.css'

// Importing Pages
//import Landing from './Layouts/Landing'
import Home from './Layouts/Home'

const hist = createBrowserHistory();

function App() {
  return <Router history={hist}>
    <Switch>
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Redirect to="/home/dashboard" />
    </Switch>
  </Router>
}
export default App
