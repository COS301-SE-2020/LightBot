import React, {Component} from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

//iframe components
//import Frame from 'iframe-react';
import Iframe from "react-iframe";

class Typography extends Component {
	render() {
		return (
			<>
				<div className="content" style={MyStyles.backgroundStyle}>
					<Row>
						<Col md="12">
							<Card className="card-plain">
								<CardHeader style={MyStyles.simStyle}>Simulation</CardHeader>
								<Iframe
									src="http://www.youtube.com/embed/xDMP3i36naA"
									width="1100px"
									height="500px"
									id="Simulation"
									display="initial"
									position="relative"
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const MyStyles = {
	simStyle: {
		paddingBottom: "40px",
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

export default Typography;
