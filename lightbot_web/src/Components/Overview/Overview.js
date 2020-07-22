import React, {Component} from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Col
} from "reactstrap";

class Overview extends Component {
    constructor(props) {
		super(props);
		this.state = {
			bigChartData: "data1",
		};
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
									</Row>
								</CardHeader>
                                <CardBody></CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Total Log Ins</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-bell-55 text-info" /> 
									</CardTitle>
								</CardHeader>
								<CardBody></CardBody>
							</Card>
						</Col>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Simulated Savings per Month</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-delivery-fast text-primary" /> 
									</CardTitle>
								</CardHeader>
								<CardBody></CardBody>
							</Card>
						</Col>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Completed Tasks</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-send text-success" /> 
									</CardTitle>
								</CardHeader>
								<CardBody></CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
        )
    }    
}
export default Overview;