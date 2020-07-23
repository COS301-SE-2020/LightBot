import React from "react";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

import { Alert, Label, FormText, Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col } from "reactstrap";

const cookies = new Cookies();

const api = axios.create({ baseURL: "http://localhost:3001/" });

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loginErrors: "",
			loginSuccess: "",
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

	// HANDLE LOGIN REQUEST
	handleSubmit = async event => {
		event.preventDefault();

		//Reset response messages
		this.state.loginErrors = "";
		this.state.loginSuccess = "";

		const { email, password } = this.state;

		await axios
			.post( "http://localhost:3001/login", {
				Email: email,
				Password: password,
			})
			.then(response => {
				console.log("Success ========>", response);

				// HANDLE RESPONE FROM API HERE
			})
			.catch(error => {
				console.log("Error ========>", error);
			});

		// CALL TO API HERE (EXAMPLE DATA)

		// (12@12 and 123 are the test credentials at the moment)

		if (email === "duncan.tilley@5dt.com" && password === "DuncanTilley") {
			//CALL TO API HERE WITH EMAIL AND PASSWORD

			// EXAMPLE OF AXIOS API REQUEST:

			// MUST BE IMPLEMENTED AT ACTUAL LOGIN FUNCTION ABOVE

			// If login success: Set the JWT from API in cookies
			// and set the logged in user email address also

			this.setState({ loginSuccess: "SUCCESS !" });
			cookies.set("JWT", email + ":" + password);
			cookies.set("Email", email);

			//Redirect the user to the dashboard
			window.location = "/admin/dashboard";
		} else {
			// Set login error state as error
			this.setState({ loginErrors: "Invalid Credentials" });
		}
	};

	render() {
		return (
			// All styles here are localized , move to scss in future
			<Form className="LoginPane">
				<img className="LoginLogo" alt="..." src={require("assets/img/LBlogo.png")} />

				<h4 style={MyStyles.Hdr}>AN ENHANCED ADAPTIVE TRAFFIC OPTIMIZATION SOLUTION WITH REINFORCEMENT LEARNING</h4>
				
				<h1 className="LoginLabel" style={MyStyles.Hdr}>
					LOGIN
				</h1>
				<h2 style={MyStyles.LoginLabel2}>Welcome!</h2>

				<FormGroup style={MyStyles.Linput1}>
		
					<Input
						type="email"
						name="email"
						id="idEmail"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleChange}
						style={MyStyles.Linput2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Linput1}>
					<Input
						type="password"
						name="password"
						id="idPassword"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}
						style={MyStyles.Linput2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Btn1}>
					<Button
						style={MyStyles.Btn2}
						size="lg"
						type="submit"
						onClick={this.handleSubmit}
						block
					>
						Log In
					</Button>
				</FormGroup>

		  <Link to='/register' style={MyStyles.CreateAccountref}>
            Create Account
          </Link>

          <Link to='/forgot-password' style={MyStyles.CreateAccountref}>
            Forgot password?
          </Link>

		  <img
            className='LoginGLogo'
            alt='...'
            src={require('../assets/img/logo.png')}
            style={MyStyles.LoginGLogo}
          />

				{this.state.loginErrors && (
					<Alert color="dark" style={MyStyles.Alrt}>
						{this.state.loginErrors}
					</Alert>
				)}

				{this.state.loginSuccess && (
					<Alert color="success" style={MyStyles.Alrt}>
						{this.state.loginSuccess}
					</Alert>
				)}
			</Form>
		);
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
	Alrt: { 
		marginTop: "30px", 
		marginLeft: "40px", 
		marginRight: "40px" 
	},
	Btn1: { 
		paddingLeft: "40px", 
		paddingRight: "40px", 
		paddingTop: "40px", 
		paddingBottom: "20px" 
	},
	Btn2: { 
		borderColor: "white", 
		backgroundColor: "transparent", 
		height: "50px", 
		borderWidth: "2" 
	},
	Linput1: { 
		paddingLeft: "40px", 
		paddingRight: "40px" 
	},
	Linput2: { 
		borderColor: "white", 
		backgroundColor: "transparent", 
		height: "50px", 
		fontSize: "18px" 
	},
	Hdr: { 
		marginBottom: 20 
	}
}
