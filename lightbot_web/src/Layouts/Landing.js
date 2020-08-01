import React from 'react'

export default function Landing() {
    return (
        <div className='wrapper' style={MyStyles.backgroundStyle}>
        whe<br></br>
        uwvbi
        </div>
    )
}

const MyStyles = {
    backgroundStyle:{
        backgroundImage: `url(${'../assets/images/Home_Background.jpg'})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    }
}