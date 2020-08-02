import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.scss?v1.4.0";
import "./assets/css/now-ui-kit.css";

import Home from "./layouts/Home.js";
import Landing from "./layouts/Landing.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing" render={(props) => <Landing {...props} />} />
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
