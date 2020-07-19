import React, { Component } from '../../../node_modules/react'
import { Form, Button, FormGroup, Input } from '../../../node_modules/reactstrap'
import PerfectScrollbar from '../../../node_modules/perfect-scrollbar'

export default class SignUpPane extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  name: '',
		  surname: '',	
		  email: '',
		  password: '',
		  repeatPassword: '',
		  validate: {
			emailState: '',
			passwordState: '',
		  },
		}
		this.handleChange = this.handleChange.bind(this)
	  }

	  validateEmail = e => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const { validate } = this.state
		if (regex.test(e.target.value)) {
		  validate.emailState = 'has-success'
		} else {
		  validate.emailState = 'has-danger'
		}
		this.setState({ validate })
	  }
	
	  validatePassword = e => {
		const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
		const { validate } = this.state
		if (regex.test(e.target.value)) {
		  validate.passwordState = 'has-success'
		} else {
		  validate.passwordState = 'has-danger'
		}
		this.setState({ validate })
	  }

	  handleChange = async e => {
		const { target } = e
		const value = target.type === 'checkbox' ? target.checked : target.value
		const { name } = target
		await this.setState({
		  [name]: value,
		})
	  }
	
	  handleSubmit = e => {
		e.preventDefault()
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

					<h4 style={MyStyles.LoginLabel1}>
						AN ENHANCED ADAPTIVE TRAFFIC OPTIMIZATION SOLUTION WITH
						REINFORCEMENT LEARNING
					</h4>

					<h3 style={MyStyles.LoginLabel2}>Create An Account</h3>

					<FormGroup>
						<Input
							type='text'
							name='name'
							id='idName'
							placeholder='Name'
							value={this.state.name}
							style={MyStyles.LoginInput}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Input
							type='text'
							name='surname'
							id='idSurname'
							placeholder='Surname'
							value={this.state.surname}
							style={MyStyles.LoginInput}
							required
						/>
					</FormGroup>

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
						<Input
							type='password'
							name='password'
							id='idPassword'
							placeholder='Password'
              				value={this.state.password}
              				valid={this.state.validate.passwordState === 'has-success'}
              				invalid={this.state.validate.passwordState === 'has-danger'}
              				onChange={(e) => {
                				this.validatePassword(e)
                				this.handleChange(e)
              				}}
							style={MyStyles.LoginInput}
							required
						/>
						<FormFeedback>
						Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.
              			</FormFeedback>
					</FormGroup>

					<FormGroup>
						<Input
							type='password'
							name='confirmpassword'
							id='idPassword2'
							placeholder='Confirm Password'
							value={this.state.repeatPassword}
              				// valid={this.state.validate.passwordState === 'has-success'}
              				// invalid={this.state.validate.passwordState === 'has-danger'}
              				// onChange={(e) => {
                			// 	this.validatePassword(e)
                			// 	this.handleChange(e)
              				// }}
							style={MyStyles.LoginInput}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Button
							style={MyStyles.LoginBtn}
							size='lg'
							type='submit'
							onClick={this.handleSubmit}
							block
						>
							Sign Up
						</Button>
					</FormGroup>

					<a href='/register' style={MyStyles.CreateAccountref}>
						Back to Login Page
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
