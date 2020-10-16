import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap'

import routes from '../../routes/homeRoutes'

class TopNavbar extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: 'transparent',
  }
  sidebarToggle = React.createRef()
  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: 'transparent',
      })
    } else {
      this.setState({
        color: 'white',
      })
    }
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  dropdownToggle = (e) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  getBrand = () => {
    var name
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name
          }
          return null
        })
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name
          }
        }
      }
      return null
    })
    return name
  }
  openSidebar = () => {
    document.documentElement.classList.toggle('nav-open')
    this.sidebarToggle.current.classList.toggle('toggled')
  }
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: 'white',
      })
    } else {
      this.setState({
        color: 'transparent',
      })
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateColor.bind(this))
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
      this.sidebarToggle.current.classList.toggle('toggled')
    }
  }

  navProfile = () => {
    this.props.history.push('/home/profile')
  }

  navNotifications = () => {
    this.props.history.push('/home/forum')
  }

  render() {
    return (
      <Navbar
        color={
          this.props.location.pathname.indexOf('full-screen-maps') !== -1
            ? 'white'
            : this.state.color
        }
        expand='lg'
        className={
          this.props.location.pathname.indexOf('full-screen-maps') !== -1
            ? 'navbar-absolute fixed-top'
            : 'navbar-absolute fixed-top ' +
              (this.state.color === 'transparent' ? 'navbar-transparent ' : '')
        }
      >
        <Container fluid>
          <div className='navbar-wrapper'>
            <div className='navbar-toggle'>
              <button
                type='button'
                ref={this.sidebarToggle}
                className='navbar-toggler'
                onClick={() => this.openSidebar()}
              >
                <span className='navbar-toggler-bar bar1' />
                <span className='navbar-toggler-bar bar2' />
                <span className='navbar-toggler-bar bar3' />
              </button>
            </div>
            <NavbarBrand href='/'>{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className='justify-content-end'
          >
            <Nav navbar>
              <NavItem>
                <a
                  className='nav-link'
                  href='#'
                  onClick={this.navNotifications}
                >
                  <i className='now-ui-icons media-2_sound-wave' />
                  <p>
                    <span className='d-lg-none d-md-block'>Notifications</span>
                  </p>
                </a>
              </NavItem>

              <NavItem>
                <a className='nav-link' href='#' onClick={this.navProfile}>
                  <i className='now-ui-icons users_single-02' />
                  <p>
                    <span className='d-lg-none d-md-block'>Profile</span>
                  </p>
                </a>
              </NavItem>
              <NavItem>
                <a
                  className='nav-link'
                  href='#'
                  onClick={this.props.modaltoggleX}
                >
                  <i className='now-ui-icons objects_spaceship' />
                  <p>
                    <span className='d-lg-none d-md-block'>Logout</span>
                  </p>
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default TopNavbar
