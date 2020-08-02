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
      <div className='page-header clear-filter' filter-color='orange'>
        <div
          className='page-header-image'
          style={{
            backgroundImage:
              'url(' +
              require('../../assets/img/LightBot_Logo_White.png') +
              ')',
          }}
        ></div>
        <div className='content'>
          <Container>
            <Col className='ml-auto mr-auto' md='4'>
              <Card className='card-login card-plain'>
                <Form action='' className='form' method=''>
                  <CardHeader className='text-center'>
                    <div className='logo-container'>
                      <img
                        alt='...'
                        src={require('../../assets/img/login.png')}
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
                          <i className='now-ui-icons users_circle-08'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='First Name...'
                        type='text'
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
                          <i className='now-ui-icons text_caps-small'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='Last Name...'
                        type='text'
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
                          href='#pablo'
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
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
