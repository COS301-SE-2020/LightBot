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

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstFocus: false,
      lastFocus: false,
      email: '',
      password: '',
      confirm: '',
      validate: {
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
  navRegister = () => {
    this.props.history.push('/landing/register')
  }
  navRecovery = () => {
    this.props.history.push('/landing/recovery')
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
                            <InputGroupText>
                              <i
                                style={MyStyles.textInputStyle}
                                className='now-ui-icons ui-1_email-85'
                              ></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            style={MyStyles.textInputStyle}
                            placeholder='Email Adress...'
                            type='email'
                            onFocus={() => this.setState({ firstFocus: true })}
                            onBlur={() => this.setState({ firstFocus: false })}
                          ></Input>
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
                            <InputGroupText>
                              <i
                                style={MyStyles.textInputStyle}
                                className='now-ui-icons objects_key-25'
                              ></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Password...'
                            type='password'
                            style={MyStyles.textInputStyle}
                            onFocus={() => this.setState({ firstFocus: true })}
                            onBlur={() => this.setState({ firstFocus: false })}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      <Button
                        block
                        className='btn-round'
                        color='primary'
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                        size='lg'
                      >
                        Get Started
                      </Button>
                      <div className='pull-left'>
                        <h6>
                          <a
                            className='link'
                            style={MyStyles.textInputStyle}
                            href='#pablo'
                            onClick={this.navRegister}
                          >
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className='pull-right'>
                        <h6>
                          <a
                            className='link'
                            style={MyStyles.textInputStyle}
                            href='#pablo'
                            onClick={this.navRecovery}
                          >
                            Forgot Password?
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

export default Login

const MyStyles = {
  loginPanel: {
    backgroundColor: 'rgba(2,2,2,0.2)',
  },
  textInputStyle: {
    color: 'white',
    opacity: '1',
  },
}
