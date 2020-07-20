import React, { Component } from "react";
import PerfectScrollbar from "perfect-scrollbar";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
  } from 'react-router-dom'

import AdminNavbar from "../../Components/TopNavbar/AdminNavbar.js";
import Sidebar from "../../Components/Sidebar/Sidebar.js";

import logo from "../../Assets/LBlogo.png";

var ps;
export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: "blue",
			sidebarOpened: document.documentElement.className.indexOf("nav-open") !== -1,
		};
	}
	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			document.documentElement.className += " perfect-scrollbar-on";
			document.documentElement.classList.remove("perfect-scrollbar-off");
			ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
			let tables = document.querySelectorAll(".table-responsive");
			for (let i = 0; i < tables.length; i++) {
				ps = new PerfectScrollbar(tables[i]);
			}
		}
	}
	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
			document.documentElement.className += " perfect-scrollbar-off";
			document.documentElement.classList.remove("perfect-scrollbar-on");
		}
	}
	componentDidUpdate(e) {
		if (e.history.action === "PUSH") {
			if (navigator.platform.indexOf("Win") > -1) {
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}
			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			this.refs.mainPanel.scrollTop = 0;
		}
	}
	// this function opens and closes the sidebar on small devices
	toggleSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
		this.setState({ sidebarOpened: !this.state.sidebarOpened });
	};
	// getRoutes = routes => {
	// 	return routes.map((prop, key) => {
	// 		if (prop.layout === "/admin") {
	// 			return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
	// 		} else {
	// 			return null;
	// 		}
	// 	});
	// };
	handleBgClick = color => {
		this.setState({ backgroundColor: color });
	};
	// getBrandText = path => {
	// 	for (let i = 0; i < routes.length; i++) {
	// 		if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
	// 			return routes[i].name;
	// 		}
	// 	}
	// 	return "Brand";
	// };
	render() {
		return (
				<div className="content" style={MyStyles.backgroundStyle}>
					<Sidebar
						{...this.props}
						// routes={routes}
						logo={{
							text: "LightBot Dash",
							imgSrc: logo,
						}}
						toggleSidebar={this.toggleSidebar}
					/>
					<div className="main-panel" ref="mainPanel" data={this.state.backgroundColor} style={MyStyles.panelStyle}>
						<AdminNavbar
							{...this.props}
							//brandText={this.getBrandText(this.props.location.pathname)}
							toggleSidebar={this.toggleSidebar}
							sidebarOpened={this.state.sidebarOpened}
							backgroundColor="white"
						/>
						{/* <Switch>
							{this.getRoutes(routes)}
							<Redirect from="*" to="/admin/dashboard" />
						</Switch> */}
					</div>
				</div>
				// <div>
				// 	<Window initialHeight={500}>
					
				// 	</Window>
				// </div>
		);
	}
}

const MyStyles = {	
	backgroundStyle: {
		backgroundImage: 'url(' + require('../../Assets/dashback.png') + ')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'cover',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	},
	panelStyle: {
		backgroundColor: "white",
	},
}