/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<Container fluid>
					<div className="copyright">
						Powered by{" "}
						<a href="#!" target="_blank">
							Gradient
						</a>{" "}
						technology
					</div>
				</Container>
			</footer>
		);
	}
}

export default Footer;
