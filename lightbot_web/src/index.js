import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
