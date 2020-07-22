import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class ManualOverride extends Component {
	render() {
		return (
				<div className="content" >
					<Row>
						<Col md="12">
							<Card className="card-plain">
								<CardHeader>Manual Override</CardHeader>
								<CardBody>
									<div id="map" className="map" style={MyStyles.manualStyle}>
								
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
		);
	}
}

const MyStyles = {
	manualStyle: {
		position: "relative", 
		overflow: "hidden",
	},
}

export default Map;
