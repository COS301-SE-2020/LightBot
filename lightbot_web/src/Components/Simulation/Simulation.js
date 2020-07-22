import React, { Component } from 'react'

// reactstrap components
import { Card } from 'reactstrap'

//iframe components
//import Frame from 'iframe-react';
import Iframe from 'react-iframe'

class Simulation extends Component {
	render() {
		return (
			<>
				<Card className='card-plain' style={MyStyles.simStyle}>
					<Iframe
						src='http://www.youtube.com/embed/xDMP3i36naA'
						width='1100px'
						height='500px'
						id='Simulation'
						display='initial'
						position='relative'
					/>
				</Card>
			</>
		)
	}
}

const MyStyles = {
	simStyle: {
		paddingBottom: '40px',
	},
}

export default Simulation
