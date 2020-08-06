import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '../routes/landingRoutes.js'
import Footer from '../components/Footer/Footer.js'
import '../assets/buff/css/bootstrap.min.css'
import '../assets/buff/scss/now-ui-kit.scss?v=1.4.0'
import '../assets/buff/demo/demo.css?v=1.4.0'
import '../assets/buff/demo/nucleo-icons-page-styles.css?v=1.4.0'
import Login from '../views/landing.views/Login'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Landing extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/home' />
    }
    return (
      <>
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                exact
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            )
          })}
          <Route path='/reset' component={routes[2].component} />
          <Route component={Login} />
        </Switch>
        <Footer fluid />
      </>
    )
  }
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
