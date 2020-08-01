// Importing Libraries
import React from 'react'
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Navbar from "components/Navbars/Navbar.js";


export default function Home() {
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