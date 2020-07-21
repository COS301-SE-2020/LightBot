import React, { Component } from 'react'
import {
  Form,
  Button,
  FormGroup,
  Input,
  FormFeedback
} from 'reactstrap'

import { Link } from 'react-router-dom'

export default class ResetPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newpassword: '',
      confirmnewpassword: '',
      validate: {
        passwordState: '',
        confirmPasswordState: '',
      },
    }
    this.handleChange = this.handleChange.bind(this)
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
    const { validate, newpassword } = this.state
    if (e.target.value === newpassword ) {
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
          <h3 style={MyStyles.LoginLabel2}>Reset Password</h3>

          <FormGroup>
            <Input
              type='password'
              name='newpassword'
              id='idPassword'
              placeholder='New Password'
              value={this.state.newpassword}
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
              name='confirmnewpassword'
              id='idPassword2'
              placeholder='Confirm New Password'
              value={this.state.confirmnewpassword}
              valid={this.state.validate.confirmPasswordState === 'has-success'}
              invalid={this.state.validate.confirmPasswordState === 'has-danger'}
              onChange={(e) => {
                this.validatePasswordMatch(e)
                this.handleChange(e)
              }}
              style={MyStyles.LoginInput}
              required
            />
            <FormFeedback>Please enter a valid password.</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Button
              style={MyStyles.LoginBtn}
              size='lg'
              type='submit'
              onClick={this.handleSubmit}
              block
            >
              Submit
            </Button>
          </FormGroup>

          <Link to='/login' style={MyStyles.CreateAccountref}>
            Return to login 
          </Link><br></br>

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
