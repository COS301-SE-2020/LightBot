import React, { Component } from 'react'

export default class Background extends Component {
    
    render() {
        return (
            <img src={this.props.background} style={styles.bg}></img>
        )
    }
}
const styles = {
    bg:{
        margin: '0',
        height: '100vh',
        width: '100vw',
    }
}