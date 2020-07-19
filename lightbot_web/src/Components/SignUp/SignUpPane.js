import React, { Component } from 'react'
import {
  Form,
  Button,
  FormGroup,
  Input,
  FormFeedback
} from 'reactstrap'

export default class SignUpPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmpassword: '',
      validate: {
        nameState: '',
        surnameState: '',
        emailState: '',
        passwordState: '',
        confirmPasswordState: '',
      },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  validateName = (e) => {
    const regex = new RegExp("^([a-zA-Z ]){6,64}")
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.nameState = 'has-success'
    } else {
      validate.nameState = 'has-danger'
    }
    this.setState({ validate })
  }

  validateSurname = (e) => {
    const regex = new RegExp("^([a-zA-Z ]){6,64}")
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.surnameState = 'has-success'
    } else {
      validate.surnameState = 'has-danger'
    }
    this.setState({ validate })
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

  validatePassword = (e) => {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.passwordState = 'has-success'
    } else {
      validate.passwordState = 'has-danger'
    }
    this.setState({ validate })
  }

  validatePasswordMatch = (e) => {
    const { validate, password } = this.state
    if (e.target.value === password ) {
      validate.confirmPasswordState = 'has-success'
    } else {
      validate.confirmPasswordState = 'has-danger'
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
          <h3 style={MyStyles.LoginLabel2}>Create An Account</h3>
          <FormGroup>
            <Input
              type='text'
              name='name'
              id='idName'
              placeholder='Name'
              value={this.state.name}
              valid={this.state.validate.nameState === 'has-success'}
              invalid={this.state.validate.nameState === 'has-danger'}
              onChange={(e) => {
                this.validateName(e)
                this.handleChange(e)
              }}
              style={MyStyles.LoginInput}
              required
            />
            <FormFeedback>Please enter a valid name.</FormFeedback>
          </FormGroup>
		  
		  <FormGroup>
            <Input
              type='text'
              name='surname'
              id='idSurname'
              placeholder='Surname'
              value={this.state.surname}
              valid={this.state.validate.surnameState === 'has-success'}
              invalid={this.state.validate.surnameState === 'has-danger'}
              onChange={(e) => {
                this.validateSurname(e)
                this.handleChange(e)
              }}
              style={MyStyles.LoginInput}
              required
            />
            <FormFeedback>Please enter a valid surname.</FormFeedback>
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
            <FormFeedback>Please enter a valid email.</FormFeedback>
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
              Minimum eight characters, at least one uppercase letter, one
              lowercase letter, one number and one special character.
            </FormFeedback>
          </FormGroup>
		  <FormGroup>
            <Input
              type='password'
              name='confirmpassword'
              id='idPassword2'
              placeholder='Confirm Password'
              value={this.state.confirmpassword}
              valid={this.state.validate.confirmPasswordState === 'has-success'}
              invalid={this.state.validate.confirmPasswordState === 'has-danger'}
              onChange={(e) => {
                this.validatePasswordMatch(e)
                this.handleChange(e)
              }}
              style={MyStyles.LoginInput}
              required
            />
            <FormFeedback>Please enter a valid email.</FormFeedback>
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
          </a><br></br>

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
	marginTop: '20px',
    maxHeight: '300px',
    width: '350px',
    paddingBottom: '0px',
  },
  LoginInput: {
    borderColor: 'white',
    backgroundColor: 'transparent',
    height: '50px',
    width: '525px',
    fontSize: '18px',
    paddingTop: '0px',
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
