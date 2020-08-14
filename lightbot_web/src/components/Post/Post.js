import React from 'react'
import ReactDOM from 'react-dom'
import { getForum } from '../../actions/auth'
import { Card, CardBody, Table, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import NotificationAlert from 'react-notification-alert'
import PropTypes from 'prop-types'
import { controllers } from 'chart.js'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colums: ['title', 'subject', 'description'],
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

  renderTable() {
    const sortedPosts = this.props.forum_data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    const history = createBrowserHistory()
    const max = history.location.pathname === '/home/overview' ? true : false
    return sortedPosts.map((item, i) => {
      while (!max || (max && i < 5)) {
        return (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.subject}</td>
            <td>{item.message}</td>
            <td>{new Date(item.date).toLocaleString()}</td>
          </tr>
        )
      }
      return null
    })
  }

  handleLoad = async (e) => {
    try {
      await this.props.getForum()
      if (this.props.message.status > 299) {
        this.notify(this.props.message.msg, 'danger')
        ReactDOM.render(
          this.props.message.msg,
          document.getElementById('table')
        )
      } else {
        this.notify(this.props.message.msg, 'success')
        ReactDOM.render(this.renderTable(), document.getElementById('table'))
      }
    } catch (err) {}
  }
  componentDidMount() {
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
                <Table reactive='true'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody id='table'></tbody>
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
  forum_data: PropTypes.array,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  forum_data: state.auth.forum_data,
  message: state.auth.message,
})

export default connect(mapStateToProps, { getForum })(Post)
