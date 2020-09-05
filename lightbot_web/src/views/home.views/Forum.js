import React from 'react'
import { sendForum } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'
import NotificationAlert from 'react-notification-alert'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'
import Post from '../../components/Post/Post'

class Forum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      subject: '',
      description: '',
    }

    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
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

  handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      title: this.state.title,
      subject: this.state.subject,
      description: this.state.description,
    }
    try {
      await this.props.sendForum(formData)
      if (this.props.message.status > 299) {
        this.notify(this.props.message.msg, 'danger')
      } else {
        this.notify(this.props.message.msg, 'success')
        this.clickChild()
      }
    } catch (err) {}
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

  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Notification Forum</h2>
            </div>
          }
        />
        <div className='content'>
          <NotificationAlert ref='notificationAlert' />
          <Post setClick={click => this.clickChild = click}/>
          <Row>
            <Col className='ml-auto mr-auto text-center' md={8} xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6} className='ml-auto mr-auto text-center'>
                      <CardTitle tag='h4'>Submit New Forum Post</CardTitle>
                    </Col>
                  </Row>
                  <Form>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='3'>
                        <FormGroup>
                          <CardTitle>Title</CardTitle>
                          <Input
                            maxLength='30'
                            name='title'
                            value={this.state.title}
                            placeholder='Title'
                            type='text'
                            onChange={(e) => {
                              this.handleChange(e)
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='4'>
                        <FormGroup>
                          <CardTitle>Subject</CardTitle>
                          <Input
                            maxLength='50'
                            placeholder='Subject'
                            name='subject'
                            value={this.state.subject}
                            type='text'
                            onChange={(e) => {
                              this.handleChange(e)
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='6'>
                        <FormGroup>
                          <CardTitle>Description</CardTitle>
                          <Input
                            maxLength='250'
                            cols='80'
                            name='description'
                            value={this.state.description}
                            placeholder='Your text Here...'
                            rows='4'
                            type='textarea'
                            onChange={(e) => {
                              this.handleChange(e)
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='4'>
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

Forum.propTypes = {
  sendForum: PropTypes.func.isRequired,
  user: PropTypes.object,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  message: state.auth.message,
})

export default connect(mapStateToProps, { sendForum })(Forum)
