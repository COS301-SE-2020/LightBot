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
                  href='https://www.creative-tim.com?ref=nudr-footer'
                  target='_blank'
                >
                  Creative Tim
                </a>
              </li>
              <li>
                <a
                  href='https://presentation.creative-tim.com?ref=nudr-footer'
                  target='_blank'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='https://blog.creative-tim.com?ref=nudr-footer'
                  target='_blank'
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className='copyright'>
            &copy; {1900 + new Date().getYear()}, Brought to you by{' '}
            <a
              href='https://www.creative-tim.com?ref=nudr-footer'
              target='_blank'
              rel='noopener noreferrer'
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
