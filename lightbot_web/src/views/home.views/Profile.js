import React from 'react'
import { loginUser } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NotificationAlert from 'react-notification-alert'


import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'

import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: true,
      visible: true,
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  onDismiss() {}
  notify(Message) {
    var options = {}
    options = {
      place: 'tc',
      message: (
        <div>
          <div>{Message}</div>
        </div>
      ),
      type: 'danger',
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 7,
    }
    this.refs.notificationAlert.notificationAlert(options)
  }

  handleChange = async (e) => {
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    await this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Profile</h2>
            </div>
          }
        />
        <div className='content'>
        <NotificationAlert ref="notificationAlert" />
          <Row>
            <Col md='8'>
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>NAME</label>
                          <Input
                            defaultValue={
                              this.props.user.success.data.User_name
                            }
                            disabled={this.state.switch}
                            placeholder='Name'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>SURNAME</label>
                          <Input
                            defaultValue={
                              this.props.user.success.data.User_surname
                            }
                            disabled={this.state.switch}
                            placeholder='Surname'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='8'>
                        <FormGroup>
                          <label>EMAIL</label>
                          <Input
                            defaultValue={
                              this.props.user.success.data.User_email
                            }
                            disabled={this.state.switch}
                            placeholder='Email'
                            type='email'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>ROLE</label>
                          <Input
                            defaultValue={
                              this.props.user.success.data.User_role === 1
                                ? 'Administrator'
                                : 'Viewer'
                            }
                            disabled={this.state.switch}
                            placeholder='Role'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>State</label>
                          <Input
                            defaultValue={
                              this.props.user.success.data.User_state
                            }
                            disabled={this.state.switch}
                            placeholder='State'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1'>
                        <div className='custom-control custom-switch'>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customSwitches'
                            onClick={() => {
                              this.setState({ switch: !this.state.switch })
                            }}
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='customSwitches'
                          >
                            Toggle this to change fields
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md='4'>
              <Card className='card-user'>
                <CardBody>
                  <div className='author'>
                    <a href='#' onClick={(e) => e.preventDefault()}>
                      <img
                        alt='...'
                        className='avatar border-gray'
                        src={require('../../assets/img/default-avatar.jpg')}
                      />
                      <h5 className='title'>
                        {this.props.user.success.data.User_name}
                      </h5>
                    </a>
                    <p className='description'>
                      {this.props.user.success.data.User_role === 1
                        ? 'Administrator'
                        : 'Viewer'}
                    </p>
                  </div>
                  <p className='description text-center'>
                    Some fancy about me
                    <br />
                    description
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md='8'>
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>Current Password</label>
                          <Input placeholder='*******' type='password' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>New Password</label>
                          <Input placeholder='*******' type='password' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input placeholder='*******' type='password' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md={4} xs={12}>
                            <Button
                            className='btn-round'
                              color="primary"
                              block
                              onClick={() => {}}
                            >
                              Submit
                            </Button>
                          </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

User.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { updateUser })(User)
