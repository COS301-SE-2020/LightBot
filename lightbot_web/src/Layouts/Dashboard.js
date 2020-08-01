// Importing Libraries
import React from 'react'


export default function Dashboard() {
    return (
        <div className='wrapper' style={MyStyles.backgroundStyle}>
        </div>
    )
}

const MyStyles = {
    backgroundStyle:{
        backgroundImage: 'url(' + require('../assets/images/Dash_Background.png') + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    }
}