import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Label,
	FormGroup,
	Input,
	Table,
	Row,
	Col,
	UncontrolledTooltip,
} from "reactstrap";

// core components
import { chartExample1, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";

const backimg = "/back1.png";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bigChartData: "data1",
		};
	}
	setBgChartData = name => {
		this.setState({
			bigChartData: name,
		});
	};

	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col xs="12">
							<Card className="card-chart">
								<CardHeader>
									<Row>
										<Col className="text-left" sm="6">
											<h5 className="card-category">Total Simulations</h5>
											<CardTitle tag="h2">Performance</CardTitle>
										</Col>
										<Col sm="6">
											<ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
												<Button
													tag="label"
													className={classNames("btn-simple", {
														active: this.state.bigChartData === "data1",
													})}
													color="info"
													id="0"
													size="sm"
													onClick={() => this.setBgChartData("data1")}
												>
													<input defaultChecked className="d-none" name="options" type="radio" />
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Sessions</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-single-02" />
													</span>
												</Button>
												<Button
													color="info"
													id="1"
													size="sm"
													tag="label"
													className={classNames("btn-simple", {
														active: this.state.bigChartData === "data2",
													})}
													onClick={() => this.setBgChartData("data2")}
												>
													<input className="d-none" name="options" type="radio" />
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Successes</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-gift-2" />
													</span>
												</Button>
												<Button
													color="info"
													id="2"
													size="sm"
													tag="label"
													className={classNames("btn-simple", {
														active: this.state.bigChartData === "data3",
													})}
													onClick={() => this.setBgChartData("data3")}
												>
													<input className="d-none" name="options" type="radio" />
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Failures</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-tap-02" />
													</span>
												</Button>
											</ButtonGroup>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line data={chartExample1[this.state.bigChartData]} options={chartExample1.options} />
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="6" md="12">
							<Card className="card-tasks">
								<CardHeader>
									<h6 className="title d-inline">Tasks(5)</h6>
									<p className="card-category d-inline"> today</p>
									<UncontrolledDropdown>
										<DropdownToggle caret className="btn-icon" color="link" data-toggle="dropdown" type="button">
											<i className="tim-icons icon-settings-gear-63" />
										</DropdownToggle>
										<DropdownMenu aria-labelledby="dropdownMenuLink" right>
											<DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
												Action
											</DropdownItem>
											<DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
												Another action
											</DropdownItem>
											<DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
												Something else
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</CardHeader>
								<CardBody>
									<div className="table-full-width table-responsive">
										<Table>
											<tbody>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Update the Documentation</p>
														<p className="text-muted">5DT Head, Pretoria, GAU 8:47 AM</p>
													</td>
													<td className="td-actions text-right">
														<Button color="link" id="tooltip636901683" title="" type="button">
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip delay={0} target="tooltip636901683" placement="right">
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultChecked defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Traffic Light Compliance</p>
														<p className="text-muted">
														The TL compliance is a regulation that requires...
														</p>
													</td>
													<td className="td-actions text-right">
														<Button color="link" id="tooltip457194718" title="" type="button">
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip delay={0} target="tooltip457194718" placement="right">
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Solve the issues</p>
														<p className="text-muted">Fifty percent of all users said they would be more likely to see the system fixed before using it again</p>
													</td>
													<td className="td-actions text-right">
														<Button color="link" id="tooltip362404923" title="" type="button">
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip delay={0} target="tooltip362404923" placement="right">
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Release v2.0.0</p>
														<p className="text-muted">UOP, Pretoria, GAU, SA 11:19 AM</p>
													</td>
													<td className="td-actions text-right">
														<Button color="link" id="tooltip818217463" title="" type="button">
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip delay={0} target="tooltip818217463" placement="right">
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Real Data Collection</p>
														<p className="text-muted">
														Lynnwood Drive, Pretoria, GAU 12:34 AM
														</p>
													</td>
													<td className="td-actions text-right">
														<Button color="link" id="tooltip831835125" title="" type="button">
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip delay={0} target="tooltip831835125" placement="right">
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												
											</tbody>
										</Table>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="6" md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">Simple Table</CardTitle>
								</CardHeader>
								<CardBody>
									<Table className="tablesorter" responsive>
									<thead className="text-primary">
											<tr>
												<th>Title</th>
												<th>Comments</th>
												<th>Posted By</th>
												<th className="text-center">Views</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Manual Override Bug</td>
												<td>Screen freezes on 3rd override</td>
												<td>James Tilde</td>
												<td className="text-center">35 Views</td>
											</tr>
											<tr>
												<td>Log Out Bug</td>
												<td>Times out on certain log outs</td>
												<td>Diane Jetson</td>
												<td className="text-center">56 Views</td>
											</tr>
											
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Dashboard;
