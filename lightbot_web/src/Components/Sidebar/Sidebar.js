import React, {Component} from "react";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { NavLink, Link } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Button, Nav, NavLink as ReactstrapNavLink } from "reactstrap";

var ps;

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.activeRoute.bind(this);
	}
	// verifies if routeName is the one active (in browser input)
	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	}
	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps = new PerfectScrollbar(this.refs.sidebar, {
				suppressScrollX: true,
				suppressScrollY: false,
			});
		}
	}
	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
		}
	}
	linkOnClick = () => {
		document.documentElement.classList.remove("nav-open");
	};
	eventhandler = (e) => {
		this.props.meow(e.target.name)
	}

	render() {
		const { bgColor, routes, rtlActive, logo } = this.props;
		let logoText = null;
		if (logo !== undefined) {
			if (logo.outterLink !== undefined) {
				logoText = (
					<a href={logo.outterLink} className="simple-text logo-normal" target="_blank" onClick={this.props.toggleSidebar}>
						{logo.text}
					</a>
				);
			} else {
				logoText = (
					<Link to={logo.innerLink} className="simple-text logo-normal" onClick={this.props.toggleSidebar}>
						{logo.text}
					</Link>
				);
			}
		}
		return (
			<div className="sidebar" style={MyStyles.blackPanel}>
				<div className="sidebar-wrapper" ref="sidebar">
					{logoText !== null ? (
						<div className="logo" style={MyStyles.Plogo}>
							{logoText}
						</div>
					) : null}

					<div className="buttons" style={MyStyles.buttonPanel}>
					<Link to='/dashboard'>
              			<Button name='overviewB' style={MyStyles.LoginBtn} size='lg' type='submit' onClick={this.eventhandler} block>
                			SYSTEM OVERVIEW
              			</Button>
            		</Link>
					<Link to='/manualoverride'>
              			<Button name='configB' style={MyStyles.LoginBtn} size='lg' type='submit' onClick={this.eventhandler} block>
                			CONFIGURATION
              			</Button>
            		</Link>
					<Link to='/simulation'>
              			<Button name='simB' style={MyStyles.LoginBtn} size='lg' type='submit' onClick={this.eventhandler} block>
                			SIMULATION
              			</Button>
            		</Link>
					<Link to='/forum'>
              			<Button name='forumB' style={MyStyles.LoginBtn} size='lg' type='submit' onClick={this.eventhandler} block>
                			FORUM
              			</Button>
            		</Link>
					<Link to='/userprofile'>
              			<Button name='profileB' style={MyStyles.LoginBtn} size='lg' type='submit' onClick={this.eventhandler} block>
                			USER PROFILE
              			</Button>
            		</Link>
					</div>	

					<Nav>
						{routes.map((prop, key) => {
							if (prop.showOnDash === true) {
								return (
									<li className={this.activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
										<NavLink
											to={prop.layout + prop.path}
											className="nav-link"
											activeClassName="active"
											onClick={this.props.toggleSidebar}
											style={{ borderColor: "white", border: "solid", borderRadius: "0", borderWidth: "1px" }}
										>
											<i className={prop.icon} />
											<p>{rtlActive ? prop.rtlName : prop.name}</p>
										</NavLink>
									</li>
								);
							} else {
								return null;
							}
						})}

						<li className="active-pro">
							<img alt="..." src={require("../../Assets/LBlogo.png")} style={MyStyles.bottomLogo1} />
						</li>
						
						<div class="line" style={MyStyles.Vline}></div>

						<li className="active-pro">
							<img alt="..." src={require("../../Assets/gradientlogo.png")} style={MyStyles.bottomLogo2} />
						</li>

					</Nav>
				</div>
			</div>
		);
	}
}

Sidebar.defaultProps = {
	rtlActive: false,
	bgColor: "primary",
	routes: [{}],
};

Sidebar.propTypes = {
	// if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
	// insde the links of this component
	rtlActive: PropTypes.bool,
	bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the text of the logo
		text: PropTypes.node,
		// the image src of the logo
		imgSrc: PropTypes.string,
	}),
};

const MyStyles = {
	LoginBtn: {
		backgroundColor: 'transparent',
		borderColor: 'white',
		width: '210px',
		borderWidth: '2',
		fontSize: '12px',
		marginTop: '10px',
		marginBottom: '10px',
		color: 'white',
		marginLeft: '10px',
	  },
	buttonPanel: {
		marginTop: '50px',
	}, 
	bottomLogo1: {
		marginTop: '120px',
		marginBottom: '10px',
		marginLeft: '5px',
		height: '60px',
		//padding: '40px'
	},
	bottomLogo2: {
		marginTop: '-70px',
		marginBottom: '10px',
		marginLeft: '120px',
		height: '60px',
		//padding: '40px'
	},
	Vline: {
		borderLeft: "1px solid white",
		height: "100px",
		position: "absolute",
		left:"50%",
		marginLeft:"-3px",
		marginTop: "-80px",
	},
	blackPanel: {
		marginTop: "40px",
	},
	Plogo: {
		marginLeft: "5px", 
		fontSize: '17px',
	},
}
export default Sidebar;
