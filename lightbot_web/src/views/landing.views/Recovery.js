import React from 'react'
import { recovery } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  FormGroup,
  FormFeedback,
} from 'reactstrap'
import store from '../../store'

class Recovery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstFocus: false,
      lastFocus: false,
      email: '',
      validate: {
        emailState: '',
      },
    }
    this.handleChange = this.handleChange.bind(this)
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
    if (this.state.validate.emailState === 'has-success') {
      const formData = {
        User_email: this.state.email,
      }
      store.dispatch(recovery(formData))
      this.props.history.push('/login')
    } else {
      //alert here
    }
  }

  navLogin = () => {
    this.props.history.push('/login')
  }
  navRegister = () => {
    this.props.history.push('/register')
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

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/home' />
    }
    return (
      <>
        <div className='page-header clear-filter'>
          <div className='page-header-image'></div>
          <div className='content'>
            <Container>
              <Col className='ml-auto mr-auto black-background' md='4'>
                <Card className='card-login card-plain'>
                  <Form action='' className='form' method=''>
                    <CardHeader className='text-center'>
                      <div className='logo-container'>
                        <img
                          alt='...'
                          src={require('../../assets/img/LightBot_Logo_White.png')}
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <InputGroup
                          className={
                            'no-border input-lg' +
                            (this.lastFocus ? ' input-group-focus' : '')
                          }
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText style={MyStyles.textInputStyle}>
                              <i className='now-ui-icons ui-1_email-85'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='email'
                            name='email'
                            id='idEmail'
                            placeholder='Email'
                            value={this.state.email}
                            valid={
                              this.state.validate.emailState === 'has-success'
                            }
                            invalid={
                              this.state.validate.emailState === 'has-danger'
                            }
                            onChange={(e) => {
                              this.validateEmail(e)
                              this.handleChange(e)
                            }}
                            onFocus={() => this.setState({ lastFocus: false })}
                            onBlur={() => this.setState({ firstFocus: false })}
                            style={MyStyles.textInputStyle}
                            required
                          />
                          <FormFeedback>
                            Please enter a valid email.
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      <Button
                        block
                        className='btn-round'
                        color='primary'
                        href='#'
                        onClick={this.handleSubmit}
                        size='lg'
                      >
                        Submit
                      </Button>
                      <br />
                      <div className='pull-left'>
                        <h6>
                          <a
                            className='link'
                            href='#'
                            onClick={this.navLogin}
                            style={MyStyles.textInputStyle}
                          >
                            Back to login
                          </a>
                        </h6>
                      </div>
                      <div className='pull-right'>
                        <h6>
                          <a
                            style={MyStyles.textInputStyle}
                            className='link'
                            href='#'
                            onClick={this.navRegister}
                          >
                            Register
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
      </>
    )
  }
}

const MyStyles = {
  textInputStyle: {
    color: 'white',
    opacity: '1',
  },
}

Recovery.propTypes = {
  recovery: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { recovery })(Recovery)
