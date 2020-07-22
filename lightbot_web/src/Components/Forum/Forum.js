import React, {Component} from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";

class Forum extends Component {
	render() {
		return (
			<div className="content">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">
										<b>Bug Reports</b>
									</CardTitle>
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
									</Table>
								</CardBody>
							</Card>
						</Col>

						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">
										<b>Resolved Bug Reports</b>
									</CardTitle>
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
									</Table>
								</CardBody>
							</Card>
						</Col>

						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">
										<b>Announcements</b>s
									</CardTitle>
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
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
		);
	}
}

export default Forum;
