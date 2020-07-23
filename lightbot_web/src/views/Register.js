import React from "react";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";

import { Button, FormGroup, Form, Input } from "reactstrap";

const cookies = new Cookies();

export default class RegisterView extends React.Component {
	render() {
		return (
			<Form className="LoginPane">
				<img className="LoginLogo" alt="..." src={require("assets/img/LBlogo.png")} />

				<h1 className="LoginLabel" style={MyStyles.Hdr}>
					Sign Up
				</h1>

				<FormGroup style={MyStyles.Input1}>
					
					<Input
						type="test"
						name="name"
						id="idName"
						placeholder="Name"
						style={MyStyles.Input2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Input1}>
					
					<Input
						type="text"
						name="Surname"
						id="idSurname"
						placeholder="Surname"
						style={MyStyles.Input2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Input1}>
					
					<Input
						type="email"
						name="email"
						id="idEmail"
						placeholder="Email"
						style={MyStyles.Input2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Input1}>
					
					<Input
						type="password"
						name="password2"
						id="idPassword2"
						placeholder="Password"
						style={MyStyles.Input2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.Input1}>
	
					<Input
						type="password"
						name="password2"
						id="idPassword2"
						placeholder="Confirm Password"
						style={MyStyles.Input2}
						required
					/>
				</FormGroup>

				<FormGroup style={MyStyles.SBtn1}>
					<Button style={MyStyles.SBtn2} size="lg" block>
						Sign Up
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
	SBtn1: { 
		paddingLeft: "40px", 
		paddingRight: "40px", 
		paddingTop: "10px" 
	},
	SBtn2: { 
		borderColor: "white", 
		backgroundColor: "transparent", 
		height: "50px", 
		borderWidth: "2" 
	},
	Input1: { 
		paddingLeft: "40px", 
		paddingRight: "40px" 
	},
	Input2: { 
		borderColor: "white", 
		backgroundColor: "transparent", 
		height: "50px" 
	}, 
	Hdr: { 
		marginBottom: 30 
	}
}