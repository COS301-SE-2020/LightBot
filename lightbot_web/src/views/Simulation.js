import React from "react";

// reactstrap components
import { Card, CardHeader, Row, Col } from "reactstrap";

//iframe components
//import Frame from 'iframe-react';
import Iframe from 'react-iframe';

class Simulation extends React.Component {
	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col md="12">
						<Card className="card-plain" >
								<CardHeader style={MyStyles.cardH}>Simulation</CardHeader>
								<div style={MyStyles.backG}>
								<Iframe
       	 							src="http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000"
										width="1130px"
										height="600px"
										id="Simulation"
										display="initial"
										position="relative" 
										
      							/>
								</div>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const MyStyles = {
	cardH: { 
		paddingBottom: "40px"
	},
	backG: {
		backgroundColor: "white",
	}
}

export default Simulation;
