import React, {Component} from 'react'
import LoginPane from '../LoginPane/LoginPane'
import ForgotPane from '../ForgotPassword/ForgotPane'
import SignUpPane from '../SignUp/SignUpPane'
import { Route } from 'react-router-dom'

export default class Landing extends Component {
    render() {
        return (
        <div className='wrapper' style={MyStyles.backgroundStyle}>
            <Route exact path = "/" component={LoginPane}/>
            <Route path = "/SignUpPane" component={SignUpPane}/>
            <Route path = "/ForgotPane" component={ForgotPane}/>
        </div>
        )
    }    
}

const MyStyles = {
    backgroundStyle: {
      backgroundImage: 'url(' + require('../../Assets/loginbackground.jpg') + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'cover',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
}