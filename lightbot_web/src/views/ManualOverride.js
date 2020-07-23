import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class ManualOverride extends React.Component {
	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col md="12">
							<Card className="card-plain">
								<CardHeader>Manual Override</CardHeader>
								<CardBody>
									<div id="manual" className="manualO" style={MyStyles.Inside}>
								
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
	Inside: { 
		position: "relative", 
		overflow: "hidden" 
	},
}

export default ManualOverride;
