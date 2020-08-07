import React from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'

import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class User extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size='sm' />
        <div className='content'>
          <Row>
            <Col md='8'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className='pr-1' md='5'>
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue='Default'
                            disabled
                            placeholder='Company'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='px-1' md='3'>
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue='default'
                            placeholder='Username'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='4'>
                        <FormGroup>
                          <label htmlFor='exampleInputEmail1'>
                            Email address
                          </label>
                          <Input placeholder='Email' type='email' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue='Xxx'
                            placeholder='Company'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue='Xxx'
                            placeholder='Last Name'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md='12'>
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue='1223 Xxx St, Xxx, Xxx'
                            placeholder='Home Address'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='4'>
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue='Xxx'
                            placeholder='City'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='px-1' md='4'>
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue='Xxx'
                            placeholder='Country'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='4'>
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder='ZIP Code' type='number' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md='12'>
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols='80'
                            defaultValue='wqnbwbdobqiovbid oqhbdgvqu idgqidvii'
                            placeholder='Here can be your description'
                            rows='4'
                            type='textarea'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md='4'>
              <Card className='card-user'>
                <div className='image'>
                  <img
                    alt='...'
                    src={require('../../assets/img/default-avatar.jpg')}
                  />
                </div>
                <CardBody>
                  <div className='author'>
                    <a href='#pablo' onClick={(e) => e.preventDefault()}>
                      <img
                        alt='...'
                        className='avatar border-gray'
                        src={require('../../assets/img/default-avatar.jpg')}
                      />
                      <h5 className='title'>Default</h5>
                    </a>
                    <p className='description'>default</p>
                  </div>
                  <p className='description text-center'>
                    "Lamborghini Mercy <br />
                    Your chick she so thirsty <br />
                    I'm in that two seat Lambo"
                  </p>
                </CardBody>
                <hr />
                <div className='button-container'>
                  <Button
                    className='btn-neutral btn-icon btn-round'
                    color='default'
                    href='#pablo'
                    onClick={(e) => e.preventDefault()}
                    size='lg'
                  >
                    <i className='fab fa-facebook-f' />
                  </Button>
                  <Button
                    className='btn-neutral btn-icon btn-round'
                    color='default'
                    href='#pablo'
                    onClick={(e) => e.preventDefault()}
                    size='lg'
                  >
                    <i className='fab fa-twitter' />
                  </Button>
                  <Button
                    className='btn-neutral btn-icon btn-round'
                    color='default'
                    href='#pablo'
                    onClick={(e) => e.preventDefault()}
                    size='lg'
                  >
                    <i className='fab fa-google-plus-g' />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default User
