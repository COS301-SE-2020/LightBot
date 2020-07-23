import React from "react";

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col } from "reactstrap";

class UserProfile extends React.Component {
	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col md="8">
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
													<Input defaultValue="Administrator" placeholder="Privilages" type="text" />
												</FormGroup>
											</Col>
											<Col className="pl-md-1" md="4">
												<FormGroup>
													<label htmlFor="exampleInputEmail1">Email address</label>
													<Input defaultValue= "duncan.tilley@5dt.com" placeholder="Email" type="text" />
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className="pr-md-1" md="6">
												<FormGroup>
													<label>First Name</label>
													<Input defaultValue="Duncan" placeholder="First Name" type="text" />
												</FormGroup>
											</Col>
											<Col className="pl-md-1" md="6">
												<FormGroup>
													<label>Last Name</label>
													<Input defaultValue="Tilley" placeholder="Last Name" type="text" />
												</FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
								<CardFooter>
									<Button className="btn-fill" color="primary" type="submit">
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
											<img alt="..." className="avatar" src={require("assets/img/Duncan.jpeg")} />
											<h5 className="title">Duncan Tilley</h5>
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

export default UserProfile;
