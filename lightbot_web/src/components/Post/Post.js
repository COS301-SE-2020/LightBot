import React from 'react'
//import { tbody } from '../../variables/general'
import { loadForum } from '../../actions/auth'
import { Card, CardBody, Table, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import NotificationAlert from 'react-notification-alert'
import PropTypes from 'prop-types'
const thead = ['Date/Time', 'Title', 'Subject', 'Creator']

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: this.props.data,
    }
    // this.onDismiss = this.onDismiss.bind(this)
    // this.notify = this.notify.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  // onDismiss() {}
  // notify(Message, type) {
  //   var options = {}
  //   options = {
  //     place: 'tc',
  //     message: (
  //       <div>
  //         <div>{Message}</div>
  //       </div>
  //     ),
  //     type: type,
  //     icon: 'now-ui-icons ui-1_bell-53',
  //     autoDismiss: 7,
  //   }
  //   this.refs.notificationAlert.notificationAlert(options)
  // }

  render() {
    return (
      <>
        <NotificationAlert ref='notificationAlert' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <Table responsive data={this.state.data}></Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  data: state.auth.data,
  message: state.auth.message,
})

export default connect(mapStateToProps, { loadForum })(Post)
