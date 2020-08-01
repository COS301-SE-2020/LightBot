import React from 'react'

export default function Landing() {
    return (
        <div className='wrapper' style={MyStyles.backgroundStyle}>
        </div>
    )
}

const MyStyles = {
    backgroundStyle:{
        backgroundImage: 'url(' + require('../assets/images/Home_Background.jpg') + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    }
}