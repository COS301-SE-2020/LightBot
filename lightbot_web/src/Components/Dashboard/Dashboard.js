import React, { Component } from "react";

export default class Dashboard extends Component {
	render() {
		return (
			<div className="content" style={MyStyles.backgroundStyle}>
			</div>
		);
	}
}

const MyStyles = {	
	backgroundStyle: {
		backgroundImage: 'url(' + require('../../Assets/dashback.png') + ')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'cover',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		height: '110vh',
	},
}