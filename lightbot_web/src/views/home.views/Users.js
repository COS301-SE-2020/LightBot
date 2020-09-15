import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { getUsers, elevate } from '../../actions/auth'
import PropTypes from 'prop-types'
import UserComponent from '../../components/UserComponent/UserComponent'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'
import NotificationAlert from 'react-notification-alert'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      views: null
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  

  setViews = (e) => {
    let { views } = this.state
    views = e
    this.setState({views})
  }

  async renderTable() {
    return this.props.user_list.map((prop, key) => {
      return (
        <UserComponent
          name={prop.User_name}
          surname={prop.User_surname}
          avatar={prop.avatar}
          role={prop.User_role}
          ustate={prop.User_state}
          key={key}
          elevate={key}
          handleC={this.handleChange}
        ></UserComponent>
      )
    })
  }

  handleChange = async (key,type) => {

    try {
      await this.props.elevate(key, type)
      if (this.props.message.status > 299) {
        this.notify(this.props.message.msg, 'danger')
        
      } else {
        this.notify(this.props.message.msg, 'success')
        this.handleLoad()
      }        
    } catch (err) {}
  
  }

  handleLoad = async (e) => {
    try {
      await this.props.getUsers()
      if (this.props.message.status > 299) {
        this.notify(this.props.message.msg, 'danger')
        
      } else {
        this.notify(this.props.message.msg, 'success')
        const x = await this.renderTable()
        Promise.all(x).then(()=>{
          this.setViews(x)
        })
      }
    } catch (err) {}
  }
  componentDidMount() {
    this.handleLoad()
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
              <h2 className='title'>Users</h2>
            </div>
          }
        />
        <div className='content'>
          <NotificationAlert ref='notificationAlert' />
          {this.state.views}
        </div>
      </>
    )
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  elevate: PropTypes.func.isRequired,
  user_list: PropTypes.array,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user_list: state.auth.user_list,
  message: state.auth.message,
})

export default connect(mapStateToProps, { elevate, getUsers })(Users)
