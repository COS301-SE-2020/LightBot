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
                <a href='https://' target='_blank'>
                  Gradient
                </a>
              </li>
              <li>
                <a href='https://' target='_blank'>
                  Facebook
                </a>
              </li>
              <li>
                <a href='https://' target='_blank'>
                  Github
                </a>
              </li>
            </ul>
          </nav>
          <div className='copyright'>
            &copy; {1900 + new Date().getYear()}, Designed and Coded by{' '}
            <a href='https://' target='_blank' rel='noopener noreferrer'>
              Team Gradient
            </a>
            .
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
