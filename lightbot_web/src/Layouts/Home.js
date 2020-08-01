// Importing Libraries
import React from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Footer from 'components/Footer/Footer.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import Navbar from 'components/Navbars/Navbar.js'

var ps

class Home extends React.Component {
  state = {
    backgroundColor: 'blue',
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
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color })
  }
  render() {
    return (
      <div className='wrapper' style={MyStyles.backgroundStyle}>
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className='main-panel' ref={this.mainPanel}>
          <Navbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              )
            })}
            <Redirect from='/admin' to='/admin/dashboard' />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    )
  }
}

export default Home

const MyStyles = {
  backgroundStyle: {
    backgroundImage:
      'url(' + require('../assets/images/Dash_Background.png') + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  },
}
