import React from "react";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

import { Alert, Button, FormGroup, Form, Input } from "reactstrap";

const cookies = new Cookies();

// Base API URL
const api = axios.create({ baseURL: "http://localhost:3001/" });

export default class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			forgotPassErrors: "",
			forgotPassSuccess: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		//console.log(event.target.value);
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	// HANDLE Forgot Password Reset Request
	handleSubmit = async event => {
		event.preventDefault();

		this.state.forgotPassErrors = "";
		this.state.forgotPassSuccess = "";

		const { email } = this.state;

		if (email) {
			// Input validation here
			this.setState({ forgotPassSuccess: "Request Sent" });
		} else {
			// Set login error state as error
			this.setState({ forgotPassErrors: "Invalid Email Input" });
		}
	};

	render() {
		return (
			<Form className="LoginPane">
				<img className="LoginLogo" alt="..." src={require("assets/img/LBlogo.png")} />

				<h1 className="LoginLabel" style={MyStyles.Hdr1}>
					PASSWORD RECOVERY
				</h1>

				<h4 style={MyStyles.Hdr2}>Please enter the email for your account:</h4>
				

				<FormGroup style={MyStyles.Eml1}>
					<Input
						type="email"
						name="email"
						id="idEmail"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleChange}
						style={MyStyles.Eml2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Buttn1}>
					<Button
						style={MyStyles.Buttn2}
						size="lg"
						type="submit"
						onClick={this.handleSubmit}
						block
					>
						Send Password Request
					</Button>
				</FormGroup>

				<Link to='/login' style={MyStyles.CreateAccountref}>
            		Back to login page
          		</Link>

				<img
            		className='LoginGLogo'
            		alt='...'
            		src={require('../assets/img/logo.png')}
            		style={MyStyles.LoginGLogo}
          		/>

				{this.state.forgotPassErrors && (
					<Alert color="danger" style={MyStyles.Aler}>
						{this.state.forgotPassErrors}
					</Alert>
				)}
				{this.state.forgotPassSuccess && (
					<Alert color="success" style={MyStyles.Aler}>
						{this.state.forgotPassSuccess}
					</Alert>
				)}
			</Form>
		);

		// FIX: Last button on form shows the error message, change to alert class
	}
}

const MyStyles = {
	CreateAccountref: {
		float: 'center',
		color: 'white',
		fontSize: 20,
		paddingLeft: '40px',
		paddingRight: '40px',
		paddingBottom: '20px',
	  },
	LoginGLogo: {
		paddingTop: '20px',
		height: '150px',
		marginBottom: '20px'
	},
	Aler: {
		marginTop: "30px", 
		marginLeft: "40px", 
		marginRight: "40px" 
	},
	Buttn1: { 
		paddingLeft: "40px", 
		paddingRight: "40px", 
		paddingTop: "20px", 
		paddingBottom: "20px" 
	},
	Buttn2: { 
		borderColor: "white", 
		backgroundColor: "transparent", 
		height: "50px", 
		borderWidth: "2" 
	}, 
	Eml1: { 
		paddingLeft: "40px", 
		paddingRight: "40px" 
	},
	Eml2: { 
		borderColor: "white", 
		backgroundColor: "transparent", 
		height: "50px", 
		fontSize: "18px" 
	},
	Hdr1: { 
		marginBottom: 30 
	},
	Hdr2: { 
		marginBottom: 20 
	},
}
