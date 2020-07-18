import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class ManualOverride extends Component {
	render() {
		return (
				<div className="content" style={MyStyles.backgroundStyle}>
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
	backgroundStyle: {
		backgroundImage: 'url(' + require('../../Assets/dashback.png') + ')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'cover',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '110vh',
	},
}

export default Map;
