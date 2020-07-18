import React, { Component } from 'react'
import Background from '../Background/Background'
import BImage from '../../Assets/loginbackground.jpg'
import { Form, Button, FormGroup, Input } from 'reactstrap'
import PerfectScrollbar from 'perfect-scrollbar'

export default class LoginPane extends Component {
	render() {
		return (
			<div className='wrapper' style={MyStyles.backgroundStyle}>
				{/* <Background background={BImage}/> */}
				<Form className='LoginPane' style={MyStyles.LoginPaneStyle}>
					<img
						className='LoginLogo'
						alt='...'
						src={require('../../Assets/LBlogo.png')}
						style={MyStyles.LoginLogo}
					/>

					<h4 style={MyStyles.LoginLabel1}>
						AN ENHANCED ADAPTIVE TRAFFIC OPTIMIZATION SOLUTION WITH
						REINFORCEMENT LEARNING
					</h4>

					<h2 style={MyStyles.LoginLabel2}>Welcome!</h2>
					<h3 style={MyStyles.LoginLabel2}>Please Log In</h3>

					<FormGroup>
						<Input
							type='email'
							name='email'
							id='idEmail'
							placeholder='Email'
							//value={this.state.email}
							//onChange={this.handleChange}
							style={MyStyles.LoginInput}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Input
							type='password'
							name='password'
							id='idPassword'
							placeholder='Password'
							//value={this.state.password}
							//onChange={this.handleChange}
							style={MyStyles.LoginInput}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Button
							style={MyStyles.LoginBtn}
							size='lg'
							type='submit'
							//onClick={this.handleSubmit}
							block
						>
							Log In
						</Button>
					</FormGroup>

					<a href='/register' style={MyStyles.CreateAccountref}>
						Create Account
					</a>

					<a href='/forgot-password' style={MyStyles.ForgotP}>
						Forgot Password?
					</a>

					<img
						className='LoginGLogo'
						alt='...'
						src={require('../../Assets/gradientlogo.png')}
						style={MyStyles.LoginGLogo}
					/>
				</Form>
			</div>
		)
	}
}
const MyStyles = {
	backgroundStyle: {
		backgroundImage: 'url(' + require('../../Assets/loginbackground.jpg') + ')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'cover',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '135vh',
	},
	LoginPaneStyle: {
		background: 'rgba(0, 0, 0, 0.7)',
		textAlign: 'center',
		width: '600px',
		float: 'right',
		flexFlow: 'row nowrap',
		alignItems: 'flex-end',
		minHeight: '100vh',
		marginBottom: '0px',
		position: 'relative',
		bottom: '1px',
	},
	LoginLogo: {
		height: '300px',
		paddingTop: '10%',
		paddingBottom: '40px',
		minHeight: '300x',
		maxHeight: '300px',
	},
	LoginInput: {
		borderColor: 'white',
		backgroundColor: 'transparent',
		height: '50px',
		width: '525px',
		fontSize: '18px',
		paddingTop: '10px',
		paddingBottom: '10px',
		marginTop: '5px',
		marginBottom: '5px',
		marginLeft: "40px",
	},
	LoginBtn: {
		backgroundColor: 'transparent',
		borderColor: 'white',
		width: '525px',
		borderWidth: '2',
		fontSize: '20px',
		marginTop: '30px',
		marginBottom: '30px',
		color: 'white',
		marginLeft: "40px", 
	},
	LoginGLogo: {
		paddingTop: '10%',
		paddingBottom: '30px',
		minHeight: '200x',
		maxHeight: '200px',
	},
	LoginLabel1: {
		color: 'white',
		fontFamily: 'Roboto-Light',
		marginBottom: '20px',
	},
	LoginLabel2: {
		color: 'white',
		fontFamily: 'Roboto-Light',
		marginBottom: '20px',
	},
	CreateAccountref: {
		float: 'center',
		color: 'white',
		fontSize: 20,
		paddingLeft: '40px',
		paddingRight: '40px',
		paddingBottom: '20px',
	},
	ForgotP: {
		float: 'center',
		color: 'white',
		fontSize: 20,
		paddingLeft: '40px',
		paddingRight: '40px',
		paddingBottom: '20px',
		paddingTop: '10px',
	},
}
