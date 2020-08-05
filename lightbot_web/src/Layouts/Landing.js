import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Footer from '../components/Footer/Footer.js'
import routes from '../routes/landingRoutes.js'
import '../assets/buff/css/bootstrap.min.css'
import '../assets/buff/scss/now-ui-kit.scss?v=1.4.0'
import '../assets/buff/demo/demo.css?v=1.4.0'
import '../assets/buff/demo/nucleo-icons-page-styles.css?v=1.4.0'

class Landing extends React.Component {
  render() {
    return (
      <>
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
          <Redirect from='/landing' to='/404' />
        </Switch>
        <Footer fluid />
      </>
    )
  }
}

export default Landing
