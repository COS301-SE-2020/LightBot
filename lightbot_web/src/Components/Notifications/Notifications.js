import React, {Component} from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import { Alert, UncontrolledAlert, Button, Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Notifications extends Component {
	render() {
		return (
			<>
				<div className="content" style={MyStyles.backgroundStyle}>
					<Row>
						<Col md="12">
							<Card className="card-plain">
								<CardHeader>Notifications</CardHeader>
								<CardBody>
									<div id="map" className="map" style={MyStyles.notifStyle}>
								
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
	notifStyle: {
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

export default Notifications;
