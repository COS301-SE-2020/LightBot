import React from 'react'
import { getForum } from '../../actions/auth'
import { Card, CardBody, Table, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import NotificationAlert from 'react-notification-alert'
import PropTypes from 'prop-types'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forum_data: [{title: 'hello', subject: 'meow', description: 'some description'}],
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
    this.myRef = React.createRef()
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

  handleLoad = async (e) => {
    try {
      await this.props.getForum()
      if (this.props.message.status > 299) {
        this.notify(this.props.message.msg, 'danger')
      } else {
        this.notify(this.props.message.msg, 'success')
      }
      console.log(this.props.forum_data)
    } catch (err) {}
  }
  componentWillMount() {
    this.handleLoad()
  }

  render() {
    return (
      <>
        <NotificationAlert ref='notificationAlert' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <Table responsive>

                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

Post.propTypes = {
  getForum: PropTypes.func.isRequired,
  forum_data: PropTypes.object,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  forum_data: state.auth.forum_data,
  message: state.auth.message,
})

export default connect(mapStateToProps, { getForum })(Post)
