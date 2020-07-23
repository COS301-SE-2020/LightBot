// Reactstrap Documentation
// reactstrap.github.io /

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Cookies from "universal-cookie";

import AdminLayout from "layouts/Admin/Admin.js";

import LoginLayout from "layouts/LoginLayout.js";

import RegisterLayout from "layouts/RegisterLayout.js";

import ForgotPassLayout from "layouts/ForgotPassLayout";

//import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const hist = createBrowserHistory();
const cookies = new Cookies();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route exact path="/" render={props => <AdminLayout {...props} />} />

			<Route exact path="/register" render={props => <RegisterLayout {...props} />} />

			<Route exact path="/login" render={props => <LoginLayout {...props} />} />

			<Route exact path="/forgot-password" render={props => <ForgotPassLayout {...props} />} />

			<Route path="/admin" render={props => <AdminLayout {...props} />} />

			{/* <Redirect from="/" to="/admin/dashboard" /> */}
		</Switch>
	</Router>,

	document.getElementById("root")
);
