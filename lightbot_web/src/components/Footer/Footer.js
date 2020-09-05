import React from 'react'
import { Container } from 'reactstrap'

import PropTypes from 'prop-types'

class Footer extends React.Component {
  navAboutus = () => {
    this.props.history.push('/aboutus')
  }
  render() {
    return (
      <footer
        className={'footer' + (this.props.default ? ' footer-default' : '')}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                Developed for <a href='https://5dt.com'>5DT</a> in collaboration
                with the{' '}
                <a href='https://www.up.ac.za'>University Of Pretoria</a>
              </li>
            </ul>
            <ul>
              <li>
                Learn more{': '}
                <a href='/aboutus' onClick={this.navAboutus}>
                  About Us
                </a>
              </li>
            </ul>
          </nav>
          <div className='copyright'>
            &copy; {1900 + new Date().getYear()} All Rights Reserved. Brought to
            you by <a href='/#'>Gradient</a>
            <img
              className='footerLogo'
              alt='...'
              src={require('../../assets/img/Gradient_Logo_White.png')}
              style={{ height: '5vh' }}
            />
          </div>
        </Container>
      </footer>
    )
  }
}

const MyStyles = {
  textInputStyle: {
    color: 'white',
    opacity: '1',
  },
  textInputStyle2: {
    color: '#f96332',
    opacity: '1',
  },
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer
