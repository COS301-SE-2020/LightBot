import React from 'react'
import { updateUser, updatePassword } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NotificationAlert from 'react-notification-alert'

import {
  FormFeedback,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'

import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: true,
      visible: true,
      oldpassword: '',
      User_password: '',
      cnewpassword: '',
      User_name: this.props.user.success.data.User_name,
      User_surname: this.props.user.success.data.User_surname,
      User_state: this.props.user.success.data.User_state,
      User_role: this.props.user.success.data.User_role,
      validate: {
        oldpasswordS: '',
        User_passwordS: '',
        cnewpasswordS: '',
        User_nameS: '',
        User_surnameS: '',
      },
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  onDismiss() {}
  notify(Message, type) {
    var options = {}
    options = {
      place: 'tc',
      message: (
        <div>
          <div>{Message}</div>
        </div>
      ),
      type: type,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 7,
    }
    this.refs.notificationAlert.notificationAlert(options)
  }

  handleChange = async (e) => {
    console.log('here')
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    await this.setState({
      [name]: value,
    })
  }

  handleSwitch = async (e) => {
    this.setState({ switch: !this.state.switch })
    if (this.state.switch === false) {
      if (
        this.state.validate.User_nameS !== 'has-danger' &&
        this.state.validate.User_surnameS !== 'has-danger'
      ) {
        const formData = {
          User_name: this.state.User_name,
          User_surname: this.state.User_surname,
        }
        try {
          await this.props.updateUser(formData)
          this.notify(
            this.props.message.msg,
            this.props.message.status > 299 ? 'danger' : 'success'
          )
        } catch (err) {}
      } else {
        this.notify('Errors in input fields, please fill in again and retry')
        this.setState({
          User_name: this.props.user.success.data.User_name,
          User_surname: this.props.user.success.data.User_surname,
        })
      }
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    if (
      this.state.validate.oldpasswordS === 'has-success' &&
      this.state.validate.User_passwordS === 'has-success' &&
      this.state.validate.cnewpasswordS === 'has-success'
    ) {
      const formData = {
        User_oldpassword: this.state.oldpassword,
        User_password: this.state.User_password,
      }
      try {
        await this.props.updatePassword(formData)
        if (this.props.message.status > 299) {
          this.notify(this.props.message.msg, 'danger')
        } else {
          this.notify(this.props.message.msg, 'success')
        }
      } catch (err) {}
    } else {
      this.notify(
        'Errors in input fields, please fill in again and retry',
        'danger'
      )
    }
  }

  validateName = (e) => {
    const regex = new RegExp('^([a-zA-Z ]){3,64}')
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.User_nameS = 'has-success'
    } else {
      validate.User_nameS = 'has-danger'
    }
    this.setState({ validate })
  }

  validateSurname = (e) => {
    const regex = new RegExp('^([a-zA-Z ]){3,64}')
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.User_surnameS = 'has-success'
    } else {
      validate.User_surnameS = 'has-danger'
    }
    this.setState({ validate })
  }

  validatePassword = (e) => {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.oldpasswordS = 'has-success'
    } else {
      validate.oldpasswordS = 'has-danger'
    }
    this.setState({ validate })
  }

  validateUPassword = (e) => {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    const { validate } = this.state
    if (regex.test(e.target.value)) {
      validate.User_passwordS = 'has-success'
    } else {
      validate.User_passwordS = 'has-danger'
    }
    this.setState({ validate })
  }

  validatePasswordMatch = (e) => {
    const { validate, User_password } = this.state
    if (e.target.value === User_password) {
      validate.cnewpasswordS = 'has-success'
    } else {
      validate.cnewpasswordS = 'has-danger'
    }
    this.setState({ validate })
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
          <NotificationAlert ref='notificationAlert' />
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
                            name='User_name'
                            value={this.state.User_name}
                            valid={
                              this.state.validate.User_nameS === 'has-success'
                            }
                            invalid={
                              this.state.validate.User_nameS === 'has-danger'
                            }
                            onChange={(e) => {
                              this.validateName(e)
                              this.handleChange(e)
                            }}
                            disabled={this.state.switch}
                            placeholder='Name'
                            type='text'
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>SURNAME</label>
                          <Input
                            name='User_surname'
                            value={this.state.User_surname}
                            valid={
                              this.state.validate.User_surnameS ===
                              'has-success'
                            }
                            invalid={
                              this.state.validate.User_surnameS === 'has-danger'
                            }
                            onChange={(e) => {
                              this.validateSurname(e)
                              this.handleChange(e)
                            }}
                            disabled={this.state.switch}
                            placeholder='Surname'
                            type='text'
                            required
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
                            disabled={true}
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
                            value={
                              this.state.User_role === 1
                                ? 'Administrator'
                                : 'Viewer'
                            }
                            disabled={true}
                            placeholder='Role'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>State</label>
                          <Input
                            value={this.state.User_state}
                            disabled={true}
                            placeholder='State'
                            type='text'
                            required
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
                            onClick={this.handleSwitch}
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
                          <Input
                            name='oldpassword'
                            type='password'
                            id='idPassword'
                            placeholder='Password'
                            value={this.state.oldpassword}
                            valid={
                              this.state.validate.oldpasswordS === 'has-success'
                            }
                            invalid={
                              this.state.validate.oldpasswordS === 'has-danger'
                            }
                            onChange={(e) => {
                              this.validatePassword(e)
                              this.handleChange(e)
                            }}
                            required
                          />
                          <FormFeedback>
                            Password must contain an uppercase character,
                            lowercase character a number and a symbol.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>New Password</label>
                          <Input
                            name='User_password'
                            placeholder='*******'
                            type='password'
                            value={this.state.User_password}
                            valid={
                              this.state.validate.User_passwordS ===
                              'has-success'
                            }
                            invalid={
                              this.state.validate.User_passwordS ===
                              'has-danger'
                            }
                            onChange={(e) => {
                              this.validateUPassword(e)
                              this.handleChange(e)
                            }}
                            required
                          />
                          <FormFeedback>
                            Password must contain an uppercase character,
                            lowercase character a number and a symbol.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input
                            name='cnewpassword'
                            placeholder='*******'
                            type='password'
                            value={this.state.cnewpassword}
                            valid={
                              this.state.validate.cnewpasswordS ===
                              'has-success'
                            }
                            invalid={
                              this.state.validate.cnewpasswordS === 'has-danger'
                            }
                            onChange={(e) => {
                              this.validatePasswordMatch(e)
                              this.handleChange(e)
                            }}
                            required
                          />
                          <FormFeedback>Passwords do not match.</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4} xs={12}>
                        <Button
                          className='btn-round'
                          color='primary'
                          block
                          onClick={this.handleSubmit}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md='4'>
              <Card>
                <CardBody>
                  <Form>
                  <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>Profile Image upload</label>
                          <Input
                            name='file'
                            type='file'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4} xs={12}>
                        <Button
                          className='btn-round'
                          color='primary'
                          block
                          onClick={this.handleSubmit}
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
  updatePassword: PropTypes.func.isRequired,
  user: PropTypes.object,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  message: state.auth.message,
})

export default connect(mapStateToProps, { updateUser, updatePassword })(User)
