import React, { Component } from 'react'
import SignIn from './SignIn'
import '../Styles/LoginPane.css'

class LoginPane extends Component {
    state = {
        step: 1,
        User_name: '',
        User_surname: '',
        User_email: '',
        User_password: ''
      }
    
      handleChange = input => e => {
        this.setState({[input]:e.target.value})
      }

      toggleStep = () => {
          const { step } = this.state
          this.setState(
              {
                  step: step-1
              }
          )
      }

    render() {
        const{step} = this.state
        const{User_email} = this.state
        const values = {User_email}
        switch(step)
        {
            case 1:
                return (
                    <div className="Pane">
                        <SignIn
                        handleChange = {this.handleChange}
                        values={values}
                        />
                    </div>
                )
            case 2:
                return (
                    <div className="Pane" style={{backgroundColor: "white"}}>
                        <SignIn
                        handleChange = {this.handleChange}
                        values={values}
                    />
                    </div>
                )
        }
        
    }
}

export default LoginPane
