import React from "react";
import { Component } from "react";
import "../Styles/Home.css";

//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
//import { Grid } from "semantic-ui-react";
//import { black } from "material-ui/styles/colors";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Cookies from "universal-cookie";

import axios from "axios"; // Used to call API requests

import Image from "react-bootstrap/Image";
import { render } from "@testing-library/react";

import { Redirect } from "react-router-dom";
const cookies = new Cookies();

//import logo from "./../Assets/logo.png";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// Set userEmail in cookies
			userEmail: cookies.get("UEmail"),

			// Set the users JWT for requests that require authentication
			userJWTToken: cookies.get("JWT"),
		};

		// this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	logUserOut(event) {
		// This is the log out function

		event.preventDefault();
		console.log("LOGOUT");

		// Set the JWT in cookies to null, deauthenticating the user
		cookies.set("JWT", "");
		cookies.set("UEmail", "");

		window.location.reload();
		return <Redirect to="/" />;
	}

	render() {
		return (
			// All styles here are localized , move to css in future
			<div className="Page">
				<Container style={{ backgroundColor: "black", maxWidth: 400, float: "center", marginLeft: 30, paddingTop: 70, height: "100%" }}>
					<h4 style={{ color: "white", marginBottom: 30, marginTop: 5 }}>Welcome: {this.state.userEmail}</h4>

					<h1 style={{ color: "white", marginBottom: 30, marginTop: 50 }}>LIGHTBOT DASHBOARD</h1>

					<Button
						style={{ backgroundColor: "transparent", borderColor: "white", marginTop: 100, marginBottom: 10 }}
						variant="primary"
						size="lg"
						block
					>
						System Overview
					</Button>

					<Button style={{ backgroundColor: "transparent", borderColor: "white", marginTop: 30, marginBottom: 10 }} variant="primary" size="lg" block>
						Manual Override
					</Button>

					<Button style={{ backgroundColor: "transparent", borderColor: "white", marginTop: 30, marginBottom: 10 }} variant="primary" size="lg" block>
						Simulation
					</Button>

					<Button
						style={{ backgroundColor: "transparent", borderColor: "white", marginTop: 30, marginBottom: 10, marginBottom: 100 }}
						variant="primary"
						size="lg"
						block
					>
						Server
					</Button>

					<h5 style={{ color: "white", marginBottom: 30, marginTop: 10, float: "bottom" }}>Powered By</h5>
					<Image style={{ maxHeight: 100, marginBottom: 60 }} src="/images/logo.png" fluid />

					<div style={{ marginBottom: 20, cursor: "select" }}>
						<a href="/logout" onClick={this.logUserOut} style={{ float: "bottom", color: "white", fontSize: 20 }}>
							Log Out
						</a>
					</div>
				</Container>
			</div>
		);
	}
}
