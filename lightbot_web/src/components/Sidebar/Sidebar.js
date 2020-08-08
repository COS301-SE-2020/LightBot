import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'reactstrap'
import PerfectScrollbar from 'perfect-scrollbar'
import logo from '../../assets/img/LightBot_Logo_White.png'

var ps

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.activeRoute.bind(this)
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
    }
  }

  // handleSubmit = async e =>
  // {
  //   e.preventDefault()
  //   try{
  //      await this.props.logout()
  //   }catch (err) {}

  // }

  render() {
    return (
      <div className='sidebar' data-color={this.props.backgroundColor}>
        <div className='logo'>
          <a href='#' className='simple-text logo-normal'>
            <div className='logo-img'>
              <img src={logo} alt='react-logo' />
            </div>
          </a>
        </div>
        <div className='sidebar-wrapper' ref='sidebar'>
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null
              if(prop.auth && this.props.role !== 1) return null
              return (
                <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? ' active active-pro' : '')
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className='nav-link'
                    activeClassName='active'
                  >
                    <i className={'now-ui-icons ' + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              )
            })}
            <li className='active'>
              <NavLink to="#" className='nav-link' activeClassName='active' onClick={this.props.logoutHandler}>
                <i className='now-ui-icons objects_spaceship' />
                <p>"Logout"</p>
              </NavLink>
            </li>
          </Nav>
        </div>
      </div>
    )
  }
}

export default Sidebar