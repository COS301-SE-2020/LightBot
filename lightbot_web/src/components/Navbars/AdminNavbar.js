import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Cookies from "universal-cookie";

// reactstrap components
import{ 
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Input,
	NavbarBrand,
	Navbar,
	NavLink,
	Nav,
	Container,
	Modal,
} from "reactstrap";

const cookies = new Cookies();

class AdminNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseOpen: false,
			modalSearch: false,
			color: "navbar-transparent",
		};
	}
	componentDidMount() {
		window.addEventListener("resize", this.updateColor);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateColor);
	}
	// function that adds color white/transparent to the navbar on resize (this is for the collapse)
	updateColor = () => {
		if (window.innerWidth < 993 && this.state.collapseOpen) {
			this.setState({
				color: "bg-white",
			});
		} else {
			this.setState({
				color: "navbar-transparent",
			});
		}
	};
	// this function opens and closes the collapse on small devices
	toggleCollapse = () => {
		if (this.state.collapseOpen) {
			this.setState({
				color: "navbar-transparent",
			});
		} else {
			this.setState({
				color: "bg-white",
			});
		}
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		});
	};
	// this function is to open the Search modal
	toggleModalSearch = () => {
		this.setState({
			modalSearch: !this.state.modalSearch,
		});
	};

	logUserOut(event) {
		// This is the log out function
		event.preventDefault();
		console.log("LOGOUT");
		// Set the JWT in cookies to null, deauthenticating the user
		cookies.set("JWT", "", { path: "/" });
		cookies.set("Email", "", { path: "/" });
		//cookies.set("Email", "");
		cookies.remove("JWT", { path: "/" });
		cookies.remove("Email", { path: "/" });

		window.location = "/login";
		return;
	}

	render() {
		return (
			<>
				<Navbar className={classNames("navbar-absolute", this.state.color)} expand="lg">
					<Container fluid>
						<div className="navbar-wrapper">
							<div
								className={classNames("navbar-toggle d-inline", {
									toggled: this.props.sidebarOpened,
								})}
							>
								<button className="navbar-toggler" type="button" onClick={this.props.toggleSidebar}>
									<span className="navbar-toggler-bar bar1" />
									<span className="navbar-toggler-bar bar2" />
									<span className="navbar-toggler-bar bar3" />
								</button>
							</div>
							<NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
								{this.props.brandText}
							</NavbarBrand>
						</div>
						<button
							aria-expanded={false}
							aria-label="Toggle navigation"
							className="navbar-toggler"
							data-target="#navigation"
							data-toggle="collapse"
							id="navigation"
							type="button"
							onClick={this.toggleCollapse}
						>
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
						</button>
						<Collapse navbar isOpen={this.state.collapseOpen}>
							<Nav className="ml-auto" navbar>
								<UncontrolledDropdown nav>
									<DropdownToggle caret color="default" data-toggle="dropdown" nav onClick={e => e.preventDefault()}>
										<div className="photo">
											<img alt="..." src={require("assets/img/Duncan.jpeg")} />
										</div>
										<b className="caret d-none d-lg-block d-xl-block" />
										<p className="d-lg-none">Log out</p>
									</DropdownToggle>
									<DropdownMenu className="dropdown-navbar" right tag="ul">
										<NavLink tag="li">
											<DropdownItem onClick={this.logUserOut} className="nav-item">
												Log out
											</DropdownItem>
										</NavLink>
									</DropdownMenu>
								</UncontrolledDropdown>
								<li className="separator d-lg-none" />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
				<Modal modalClassName="modal-search" isOpen={this.state.modalSearch} toggle={this.toggleModalSearch}>
					<div className="modal-header">
						<Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
						<button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={this.toggleModalSearch}>
							<i className="tim-icons icon-simple-remove" />
						</button>
					</div>
				</Modal>
			</>
		);
	}
}

export default AdminNavbar;
