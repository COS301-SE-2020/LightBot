import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={'footer' + (this.props.default ? ' footer-default' : '')}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a
                  href='https://5dt.com/'
                >
                  5DT
                </a>
              </li>
              <li>
                <a
                  href='https://up.ac.za/'
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>
          <div className='copyright'>
            &copy; {1900 + new Date().getYear()}, Brought to you by{' '}
            <a
              href='#'
            >
              Gradient
            </a>
            .
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

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer
