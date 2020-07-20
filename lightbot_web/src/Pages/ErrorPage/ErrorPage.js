import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class ErrorPage extends Component {
	render() {
		return (
			<div className="content" style={MyStyles.backgroundStyle}>
                <section className='container'>
                <img src={require('../../Assets/tinsanity-404-page.gif')} style={{width:'100%', marginTop:'60px'}}/>
                <Link to='/' style={MyStyles.CreateAccountref}>
					Return to landing page.
				</Link>
				</section>
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
        height: '100vh',
        width: '100vw',
	},
}