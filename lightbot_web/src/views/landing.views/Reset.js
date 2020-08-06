import React from 'react'
import { reset } from '../../actions/auth'
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
//Token for reset
class Reset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: 'asdf',
      firstFocus: false,
      lastFocus: false,
      password: '',
      confirmpassword: '',
      validate: {
        passwordState: '',
        confirmPasswordState: '',
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
    if (
      (this.state.validate.passwordState ===
        this.state.validate.confirmPasswordState) ===
      'has-success'
    ) {
      const formData = {
        User_password: this.state.password,
      }
      reset(formData, this.state.token)
      this.props.history.push('/login')
    } else {
      //alert here
    }
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
    if (e.target.value === password) {
      validate.confirmPasswordState = 'has-success'
    } else {
      validate.confirmPasswordState = 'has-danger'
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
                              <i className='now-ui-icons objects_key-25'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='password'
                            name='password'
                            id='idPassword'
                            placeholder='Password'
                            value={this.state.password}
                            valid={
                              this.state.validate.passwordState ===
                              'has-success'
                            }
                            invalid={
                              this.state.validate.passwordState === 'has-danger'
                            }
                            onChange={(e) => {
                              this.validatePassword(e)
                              this.handleChange(e)
                            }}
                            onFocus={() => this.setState({ lastFocus: false })}
                            onBlur={() => this.setState({ firstFocus: false })}
                            style={MyStyles.textInputStyle}
                            required
                          />
                          <FormFeedback>
                            Password must contain an uppercase character,
                            lowercase character a number and a symbol.
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup
                          className={
                            'no-border input-lg' +
                            (this.lastFocus ? ' input-group-focus' : '')
                          }
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText style={MyStyles.textInputStyle}>
                              <i className='now-ui-icons objects_key-25'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='password'
                            name='confirmpassword'
                            id='idPassword2'
                            placeholder='Confirm Password'
                            value={this.state.confirmpassword}
                            valid={
                              this.state.validate.confirmPasswordState ===
                              'has-success'
                            }
                            invalid={
                              this.state.validate.confirmPasswordState ===
                              'has-danger'
                            }
                            onChange={(e) => {
                              this.validatePasswordMatch(e)
                              this.handleChange(e)
                            }}
                            onFocus={() => this.setState({ lastFocus: false })}
                            onBlur={() => this.setState({ firstFocus: false })}
                            style={MyStyles.textInputStyle}
                            required
                          />
                          <FormFeedback>Passwords do not match.</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      <Button
                        block
                        className='btn-round'
                        color='primary'
                        href='#'
                        onClick={this.onSubmitHandler}
                        size='lg'
                      >
                        Submit
                      </Button>
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

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { reset })(Reset)
