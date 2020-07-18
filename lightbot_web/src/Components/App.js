import React from 'react';
import './App.css';
import LoginPane from './LoginPane/LoginPane';
import SignUpPane from './SignUp/SignUpPane';
import ForgotPane from './ForgotPassword/ForgotPane';

import "../Assets/scss/black-dashboard-react.scss";

function App() {
  return (
    <LoginPane/>
    //<SignUpPane/>
    //<ForgotPane/>
  );
}

export default App;
