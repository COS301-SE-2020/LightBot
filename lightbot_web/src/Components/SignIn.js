import React, { Component } from "react";

import Cookies from "universal-cookie";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert"; // Alert message box

import axios from "axios"; // API CALLING

import { Redirect } from "react-router-dom";

//import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
//import { Row, Col, Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import TextField from "material-ui/TextField";
//import RaisedButton from "material-ui/RaisedButton";
//import { withRouter } from "react-router-dom";
//import Badge from "react-bootstrap/Badge";

import "bootstrap/dist/css/bootstrap.css";

const cookies = new Cookies();

export default class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loginErrors: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		const { email, password } = this.state;

		// CALL TO API HERE (EXAMPLE DATA)

		// (12@12 and 123 are the test credentials at the moment)

		if (email === "12@12" && password === "123") {
			//CALL TO API HERE WITH EMAIL AND PASSWORD

			// If login success: Set the JWT (Jason Web Token) from API in cookies
			// and set the logged in user email address also

			this.setState({ loginErrors: "SUCCESS!" });
			cookies.set("JWT", email + ":" + password);
			cookies.set("UEmail", email);

			//Redirect the user to the dashboard
			return <Redirect to="/dashboard" />;

			//FIX: URL shows user's email in password as query params at the moment,
			// remove in future. EX: http://localhost:3000/  -> ?email=12%4012&password=123 <-
		} else {
			// Set login error state as error
			this.setState({ loginErrors: "INVALID CREDENTIALS" });
		}

		//console.log(email + ":" + password);

		event.preventDefault();

		// EXAMPLE OF AXIOS API REQUEST :

		// MUST BE IMPLEMENTED AT ACTUAL LOGIN FUNCTION ABOVE

		// axios
		// 	.post(
		// 		"http://localhost:3001/sessions",
		// 		{
		// 			user: {
		// 				email: email,
		// 				password: password,
		// 			},
		// 		},
		// 		{ withCredentials: true }
		// 	)
		// 	.then(response => {
		// 		if (response.data.logged_in) {
		// 			this.props.handleSuccessfulAuth(response.data);
		// 		}
		// 	})
		// 	.catch(error => {
		// 		console.log("login error", error);
		// 	});
	}

	render() {
		return (
			// All styles here are localized , move to scss in future

			<Form onSubmit={this.handleSubmit} style={{ margin: 50, marginTop: "5%" }}>
				<Image style={{ maxHeight: 140, marginBottom: 30 }} src="/images/logo.png" fluid />
				<h1 style={{ color: "white", marginBottom: 30 }}>LIGHTBOT DASHBOARD</h1>
				<h4 style={{ color: "white", marginBottom: 0 }}>An Artificially Adaptive</h4>
				<h4 style={{ color: "white", marginBottom: 50 }}>Traffic Control System</h4>
				<Form.Group controlId="formBasicEmail">
					{/* <Form.Label>Email address</Form.Label> */}
					<Form.Control
						style={{ backgroundColor: "transparent", height: "45px" }}
						type="email"
						name="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					{/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					{/* <Form.Label>Password</Form.Label> */}

					<Form.Control
						style={{ backgroundColor: "transparent", height: "45px" }}
						type="password"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}
						required
					/>
				</Form.Group>

				<a href="/forgot-password" style={{ float: "right", color: "white", fontSize: 20 }}>
					Forgot Password?
				</a>

				<Button style={{ backgroundColor: "transparent", borderColor: "white", marginTop: 100 }} variant="primary" type="submit" size="lg" block>
					Log In
				</Button>

				{this.state.loginErrors && (
					<Button style={{ backgroundColor: "#F8D7DA", borderColor: "black", marginTop: 20, color: "black" }} variant="primary" size="lg" block>
						{this.state.loginErrors}
					</Button>
				)}
			</Form>
		);

		// FIX: Last button on form shows the error message, change to alert class
	}
}
