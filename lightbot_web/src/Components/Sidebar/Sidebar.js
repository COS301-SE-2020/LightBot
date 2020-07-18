import React, {Component} from "react";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { NavLink, Link } from "react-router-dom";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";

var ps;

class Sidebar extends Component {
	render() {
		const { bgColor, routes, rtlActive, logo } = this.props;
		let logoImg = null;
		let logoText = null;
		if (logo !== undefined) {
			if (logo.outterLink !== undefined) {
				logoImg = (
					<a href={logo.outterLink} className="simple-text logo-mini" target="_blank" onClick={this.props.toggleSidebar}>
						<div className="logo-img">
							<img src={logo.imgSrc} alt="react-logo" />
						</div>
					</a>
				);
				logoText = (
					<a href={logo.outterLink} className="simple-text logo-normal" target="_blank" onClick={this.props.toggleSidebar}>
						{logo.text}
					</a>
				);
			} else {
				logoImg = (
					<Link to={logo.innerLink} className="simple-text logo-mini" onClick={this.props.toggleSidebar}>
						<div className="logo-img">
							<img src={logo.imgSrc} alt="react-logo" />
						</div>
					</Link>
				);
				logoText = (
					<Link to={logo.innerLink} className="simple-text logo-normal" onClick={this.props.toggleSidebar}>
						{logo.text}
					</Link>
				);
			}
		}
		return (
			<div className="sidebar" style={{ backgroundColor: "red" }}>
				<div className="sidebar-wrapper" ref="sidebar">
					{logoImg !== null || logoText !== null ? (
						<div className="logo">
							{logoImg}
							{logoText}
						</div>
					) : null}
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
							<img alt="..." src={require("../../Assets/LBlogo.png")} style={{ padding: 30 }} />
						</li>
					</Nav>
				</div>
			</div>
		);
	}
}

export default Sidebar;
