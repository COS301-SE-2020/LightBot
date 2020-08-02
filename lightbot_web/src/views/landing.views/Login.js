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
} from 'reactstrap'

function Login() {
  const [firstFocus, setFirstFocus] = React.useState(false)
  const [lastFocus, setLastFocus] = React.useState(false)
  return (
    <>
      <div className='page-header clear-filter' filter-color=''>
        <div
          className='page-header-image'
          style={{
            backgroundImage:
              'url(' + require('../../assets/img/login.png') + ')',
          }}
        ></div>
        <div className='content'>
          <Container>
            <Col className='ml-auto mr-auto' md='4' style={MyStyles.loginPanel}>
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
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (firstFocus ? ' input-group-focus' : '')
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
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (lastFocus ? ' input-group-focus' : '')
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
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
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
                          onClick={(e) => e.preventDefault()}
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
                          onClick={(e) => e.preventDefault()}
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
