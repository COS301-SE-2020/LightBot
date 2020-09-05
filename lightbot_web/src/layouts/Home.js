import React, { useState } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Switch, Redirect } from 'react-router-dom'
import Footer from '../components/Footer/Footer.js'
import Sidebar from '../components/Sidebar/Sidebar.js'
import TopNavbar from '../components/TopNavbar/TopNavbar'
import routes from '../routes/homeRoutes.js'
import { logout } from '../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PrivateRoute from '../routes/PrivateRoute'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

var ps

class Home extends React.Component {
  state = {
    backgroundColor: 'black',
    modal: false,
  }
  modaltoggle = () => {
    let { modal } = this.state
    modal = !modal
    this.setState({ modal })
  }

  mainPanel = React.createRef()
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current)
      document.body.classList.toggle('perfect-scrollbar-on')
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
      document.body.classList.toggle('perfect-scrollbar-on')
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0
      document.scrollingElement.scrollTop = 0
      this.mainPanel.current.scrollTop = 0
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await this.props.logout()
    } catch (err) {}
  }
  render() {
    if (!this.props.isAuthenticated) {
      this.handleSubmit()
    }
    return (
      <div className='wrapper'>
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
          modaltoggleX={this.modaltoggle}
          role={this.props.user.User_role}
        />
        <div className='main-panel' ref={this.mainPanel}>
          <TopNavbar {...this.props} modaltoggleX={this.modaltoggle} />
          <Switch>
            {routes.map((prop, key) => {
              if (prop.auth && this.props.user.User_role !== 1) return null
              return (
                <PrivateRoute
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              )
            })}
            <Redirect from='/home' to='/home/overview' />
          </Switch>
          <Footer fluid />
          <Modal isOpen={this.state.modal} className='modal-content'>
            <ModalHeader class='modal-header'>
              <div className='logo-container'>
                <img
                  style={MyStyles.imgStyle}
                  alt='...'
                  src={require('../assets/img/LightBot_Logo_White.png')}
                ></img>
              </div>
              <div>Are you sure you'd like to logout?</div>
              <hr style={MyStyles.hrstyle}></hr>
            </ModalHeader>
            <ModalBody className='modal-body'>
              <Button color='danger' onClick={this.handleSubmit}>
                Yes
              </Button>
              <Button color='dark' onClick={this.modaltoggle}>
                No
              </Button>
            </ModalBody>
            {/* <ModalFooter className='modal-footer'>
            <hr style={MyStyles.hrstyle}></hr>
            </ModalFooter> */}
          </Modal>
        </div>
      </div>
    )
  }
}

const MyStyles = {
  hrstyle: {
    backgroundColor: 'grey',
    width: '100%',
    height: '1px',
  },
  imgStyle: {
    width: '300px',
    height: '200px',
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { logout })(Home)
