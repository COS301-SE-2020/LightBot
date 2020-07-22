import React, { Component } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Button, Row, Col, Card } from 'reactstrap'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import AdminNavbar from '../../Components/TopNavbar/AdminNavbar.js'
import Sidebar from '../../Components/Sidebar/Sidebar.js'
import Overview from '../../Components/Overview/Overview'
import ManualOverride from '../../Components/ManualOverride/ManualOverride'
import Simulation from '../../Components/Simulation/Simulation'
import UserProfile from '../../Components/UserProfile/UserProfile'

import logo from '../../Assets/LBlogo.png'

var ps
export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sidebarOpened:
				document.documentElement.className.indexOf('nav-open') !== -1,
		}
	}

	// this function opens and closes the sidebar on small devices
	toggleSidebar = () => {
		document.documentElement.classList.toggle('nav-open')
		this.setState({ sidebarOpened: !this.state.sidebarOpened })
	}

	somefunction = (choice) => {
		console.log(choice)
	}

	render() {
		return (
			<div className='content' style={MyStyles.backgroundStyle}>
				<Sidebar
					meow = {this.somefunction}
					{...this.props}
					logo={{
						text: 'LightBot Dashboard',
					}}
					toggleSidebar={this.toggleSidebar}
				/>
				<div
					className='main-panel'
					ref='mainPanel'
					data={this.state.backgroundColor}
					style={MyStyles.panelStyle}
				>
					<AdminNavbar
						{...this.props}
						toggleSidebar={this.toggleSidebar}
						sidebarOpened={this.state.sidebarOpened}
						backgroundColor='white'
					/>
					<div className='window' style={MyStyles.window}>
						<Row>
							<Col md='12'>
								
							</Col>
						</Row>
					</div>
				</div>
			</div>
		)
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
		backgroundColor: 'black',
	},
	window: {
		// paddingBottom: '40px',
		width: '1100px',
		height: '550px',
		display: 'initial',
		position: 'fixed',
		backgroundColor: 'transparent',
		marginTop: '100px',
		marginLeft: '300px',

	},
}
