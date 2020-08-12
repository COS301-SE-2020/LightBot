import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import routes from "../routes/homeRoutes.js";
import { logout } from '../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PrivateRoute from "../routes/PrivateRoute";

var ps;

class Home extends React.Component {
  state = {
    backgroundColor: "black",
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }
  handleSubmit = async e =>
  {
    e.preventDefault()
    try{
       await this.props.logout()
    }catch (err) {}

  }
  render() {
    if (!this.props.isAuthenticated) {
      this.handleSubmit()
    }
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
          logoutHandler={this.handleSubmit}
          role={this.props.user.User_role}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <Switch>
            {routes.map((prop, key) => {
              if(prop.auth && this.props.user.User_role!==1) return null
              return (
                <PrivateRoute
                  exact path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from="/home" to="/home/overview" />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps,{logout})(Home)
