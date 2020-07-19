import React, { Component } from 'react'
import { Form, Button, FormGroup, Input, FormFeedback } from 'reactstrap'

export default class ForgotPane extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			validate: {
				emailState: '',
			},
		}
		this.handleChange = this.handleChange.bind(this)
	}

	validateEmail = (e) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const { validate } = this.state
		if (regex.test(e.target.value)) {
			validate.emailState = 'has-success'
		} else {
			validate.emailState = 'has-danger'
		}
		this.setState({ validate })
	}

	handleChange = async (e) => {
		const { target } = e
		const value = target.type === 'checkbox' ? target.checked : target.value
		const { name } = target
		await this.setState({
			[name]: value,
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { validate } = this.state
		if(validate.emailState==='has-danger')
			return;

		const { email } = this.state
		
		//axios call here
		//then alert person that email has been sent (An email will be sent to your address if an account associated with it exists.)
	}

	render() {
		return (
			<div className='wrapper' style={MyStyles.backgroundStyle}>
				<Form className='LoginPane' style={MyStyles.LoginPaneStyle}>
					<img
						className='LoginLogo'
						alt='...'
						src={require('../../Assets/LBlogo.png')}
						style={MyStyles.LoginLogo}
					/>

					<h2 style={MyStyles.LoginLabel1}>Password Recovery</h2>

					<h3 style={MyStyles.LoginLabel2}>
						Please enter your email address:{' '}
					</h3>

					<FormGroup>
						<Input
							type='email'
							name='email'
							id='idEmail'
							placeholder='Email'
							value={this.state.email}
							valid={this.state.validate.emailState === 'has-success'}
							invalid={this.state.validate.emailState === 'has-danger'}
							onChange={(e) => {
								this.validateEmail(e)
								this.handleChange(e)
							}}
							style={MyStyles.LoginInput}
							required
						/>
						<FormFeedback>
							Please enter a valid email.
						</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Button
							style={MyStyles.LoginBtn}
							size='lg'
							type='submit'
							onClick={this.handleSubmit}
							block
						>
							Reset Password
						</Button>
						<FormFeedback>
							There are invalid fields.
						</FormFeedback>
					</FormGroup>

					<a href='/register' style={MyStyles.CreateAccountref}>
						Back to Login Page
					</a><br/>

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
		height: '110vh',
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
		marginLeft: '40px',
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
		marginLeft: '40px',
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
