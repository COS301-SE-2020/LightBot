import React from 'react'

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

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstFocus: false,
      lastFocus: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
      validate: {
        firstnameState: 'has-success',
        lastnameState: '',
        emailState: '',
        passwordState: '',
        confirmState: '',
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
  navLogin = () => {
    this.props.history.push('/landing/login')
  }
  navRecovery = () => {
    this.props.history.push('/landing/recovery')
  }
  onSubmitHandler = (e) => {
    e.preventDefault()
    //IF FIELDS FILLED AND VERIFIED
    //MAKE API CALL
    //IF API CALL SUCCESS AND RETURN LOGIN
    this.props.history.push('/landing/login')
    //ELSE ERROR AND DO NOTHING
    //ELSE ERROR AND DO NOTHING
  }

  validateFirstname = (e) => {
    const { validate } = this.state
    if (e.target.value.size > 4) {
      validate.firstnameState = 'has-success'
    } else {
      validate.firstnameState = 'has-danger'
    }
    this.setState({ validate })
  }

  render() {
    return (
      <>
        <div className='page-header clear-filter'>
          <div
            className='page-header-image'
            style={{
              backgroundImage:
                'url(' + require('../../assets/img/login.png') + ')',
            }}
          ></div>
          <div className='content'>
            <Container>
              <Col
                className='ml-auto mr-auto'
                md='4'
                style={MyStyles.loginPanel}
              >
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
                            (this.firstFocus ? ' input-group-focus' : '')
                          }
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText style={MyStyles.textInputStyle}>
                              <i className='now-ui-icons users_circle-08'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            style={MyStyles.textInputStyle}
                            placeholder='First Name...'
                            type='text'
                            value={this.state.firstname}
                            valid={
                              this.state.validate.firstnameState ===
                              'has-success'
                            }
                            invalid={
                              this.state.validate.firstnameState ===
                              'has-danger'
                            }
                            onChange={(e) => {
                              //this.validateFirstname(e)
                              //this.handleChange(e)
                            }}
                            onFocus={() => this.setState({ firstFocus: true })}
                            onBlur={() => this.setState({ firstFocus: false })}
                          ></Input>
                        </InputGroup>
                        <FormFeedback valid>
                          Please enter a valid name.
                        </FormFeedback>
                      </FormGroup>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (this.lastFocus ? ' input-group-focus' : '')
                        }
                      >
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText style={MyStyles.textInputStyle}>
                            <i className='now-ui-icons text_caps-small'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          style={MyStyles.textInputStyle}
                          placeholder='Last Name...'
                          type='text'
                          onFocus={() => this.setState({ lastFocus: false })}
                          onBlur={() => this.setState({ firstFocus: false })}
                        ></Input>
                      </InputGroup>
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
                          style={MyStyles.textInputStyle}
                          placeholder='Email...'
                          type='email'
                          onFocus={() => this.setState({ lastFocus: false })}
                          onBlur={() => this.setState({ firstFocus: false })}
                        ></Input>
                      </InputGroup>
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
                          style={MyStyles.textInputStyle}
                          placeholder='Password...'
                          type='password'
                          onFocus={() => this.setState({ lastFocus: false })}
                          onBlur={() => this.setState({ firstFocus: false })}
                        ></Input>
                      </InputGroup>
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
                          style={MyStyles.textInputStyle}
                          placeholder='Confirm Password...'
                          type='password'
                          onFocus={() => this.setState({ lastFocus: false })}
                          onBlur={() => this.setState({ firstFocus: false })}
                        ></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      <Button
                        block
                        className='btn-round'
                        color='primary'
                        href='#pablo'
                        onClick={this.onSubmitHandler}
                        size='lg'
                      >
                        Get Started
                      </Button>
                      <div className='pull-left'>
                        <h6>
                          <a
                            className='link'
                            href='#'
                            onClick={this.navLogin}
                            style={MyStyles.textInputStyle}
                          >
                            Return to login
                          </a>
                        </h6>
                      </div>
                      <div className='pull-right'>
                        <h6>
                          <a
                            style={MyStyles.textInputStyle}
                            className='link'
                            href='#'
                            onClick={this.navRecovery}
                          >
                            Forgot Pasword?
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

export default Register

const MyStyles = {
  loginPanel: {
    backgroundColor: 'rgba(2,2,2,0.2)',
  },
  textInputStyle: {
    color: 'white',
    opacity: '1',
  },
}
