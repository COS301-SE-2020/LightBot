import React, { Component } from 'react'
import { Form, Button, FormGroup, Input, FormFeedback } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class LoginPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
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
      <div className="content" style={MyStyles.backgroundStyle}>

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
            <Button
              style={MyStyles.LoginBtn}
              size='lg'
              type='submit'
              onClick={this.handleSubmit}
              block
            >
              Log In
            </Button>
          </FormGroup>

          <Link to='/register' style={MyStyles.CreateAccountref}>
            Create Account
          </Link>

          <Link to='/recover' style={MyStyles.CreateAccountref}>
            Forgot password?
          </Link>

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
		backgroundSize: 'cover',
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
    overflow: 'hidden',
  },
  LoginLogo: {
    height: '300px',
    width: '350px',
    paddingBottom: '30px',
  },
  LoginInput: {
    borderColor: 'white',
    backgroundColor: 'transparent',
    height: '50px',
    width: '525px',
    fontSize: '18px',
    paddingTop: '20px',
    paddingBottom: '20px',
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
    paddingTop: '20px',
    height: '150px',
    marginBottom: '20px'
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
