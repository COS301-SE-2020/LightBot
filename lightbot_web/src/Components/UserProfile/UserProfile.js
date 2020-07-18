import React, {Component} from "react";

// reactstrap components
import { Alert, Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col } from "reactstrap";

export default class UserProfile extends Component {
	constructor(props) {
		super(props);

		// Call to API to fetch user information will be here
		// Set state items below at API successfully called

		// Remove defaults
		this.state = {
			email: "",
			name: "",
			surname: "",
			privilage: "Administrator",
			errorsmsg: "",
			successmsg: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	// HANDLE LOGIN REQUEST
	handleSubmit = async event => {
		// button press functions here
		event.preventDefault();

		this.state.errorsmsg = "";
		this.state.successmsg = "";

		const { email, name, surname, privilage } = this.state;

		// Validate here if data has changed
		//If changed, call to api and update user data

		// Default success flag
		var success = true;

		if (success) {
			this.setState({ successmsg: "Changes saved successfully." });
		} else {
			this.setState({ errorsmsg: "Some error occurred. Changed could not be saved." });
		}

		// Log some data to check
		console.log(email + ":" + name);
	};

	
	render() {
		return (
			<>
				<div className="content" style={MyStyles.backgroundStyle}>
					<Row>
						<Col md="7">
							<Card>
								<CardHeader>
									<h5 className="title">Edit Profile</h5>
								</CardHeader>
								<CardBody>
									<Form>
										<Row>
											<Col className="pr-md-1" md="5">
												<FormGroup>
													<label>User privilages</label>
													<Input defaultValue={this.state.privilage} type="select" name="select" id="exampleSelect">
														<option>Read</option>
														<option>Write</option>
														<option>Execute</option>
														<option>Administrator</option>
													</Input>
												</FormGroup>
											</Col>
											<Col className="pl-md-1" md="5">
												<FormGroup>
													<label htmlFor="exampleInputEmail1">Email address</label>
													<Input defaultValue={this.state.email} placeholder="Email" type="text" name="email" onChange={this.handleChange} />
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className="pr-md-1" md="5">
												<FormGroup>
													<label>First Name</label>
													<Input defaultValue={this.state.name} placeholder="First Name" type="text" name="name" onChange={this.handleChange} />
												</FormGroup>
											</Col>
											<Col className="pl-md-1" md="5">
												<FormGroup>
													<label>Last Name</label>
													<Input defaultValue={this.state.surname} placeholder="Last Name" type="text" name="surname" onChange={this.handleChange} />
												</FormGroup>
											</Col>
										</Row>

										{this.state.errorsmsg && (
											<Alert color="dark" style={MyStyles.alert}>
												{this.state.errorsmsg}
											</Alert>
										)}

										{this.state.successmsg && (
											<Alert color="success" style={MyStyles.alert}>
												{this.state.successmsg}
											</Alert>
										)}
									</Form>
								</CardBody>
								<CardFooter>
									<Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
										Save
									</Button>
								</CardFooter>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-user">
								<CardBody>
									<CardText />
									<div className="author">
										<div className="block block-one" />
										<div className="block block-two" />
										<div className="block block-three" />
										<div className="block block-four" />
										<a href="#pablo" onClick={e => e.preventDefault()}>
											<img alt="..." className="avatar" src={require("../../Assets/avatar.png")} />
											<h5 className="title">Name Surname</h5>
										</a>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const MyStyles = {
	alert: {
		marginTop: "30px",
	},	
	backgroundStyle: {
		backgroundImage: 'url(' + require('../../Assets/dashback.png') + ')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'cover',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '110vh',
	},
}