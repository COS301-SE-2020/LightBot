import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";
import Error from "./Error";
import "../Styles/App.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends Component {
	render() {
		// INFO on JWT: https://jwt.io/

		// NB: Check if JWT is set in cookies
		// Extra security: Call to API and check authenticity of JWT with signature

		// If JWT is not found, set current to Login screen
		let current = !cookies.get("JWT") ? Login : Home;

		return (
			<Router>
				<Switch>
					<Route exact path="/" component={current} />

					<Route exact path="/dashboard" component={current} />

					<Route exact path="/404" component={Error} />

					{/* <Route
						exact
						path="/logout"
						onEnter={() => {
							cookies.set("JWT", "Glee");
						}}
						component={current}
					/> */}

					<Redirect to="/404" />
				</Switch>
			</Router>
		);
	}
}

export default App;
