import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
} from 'reactstrap'

import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: this.props.user.avatar,
      switch: true,
      visible: true,
      oldpassword: '',
      User_password: '',
      cnewpassword: '',
      User_name: this.props.user.User_name,
      User_surname: this.props.user.User_surname,
      User_state: this.props.user.User_state,
      User_role: this.props.user.User_role,
      validate: {
        oldpasswordS: '',
        User_passwordS: '',
        cnewpasswordS: '',
        User_nameS: '',
        User_surnameS: '',
      },
    }
  }

  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Users</h2>
            </div>
          }
        />
        <div className='content'>
          <Row >
            <Col >
              <Row>
                <Col className='ml-auto mr-auto text-center' md='6'>
                  <Card className='card-user'>
                    <CardHeader className='image'>
                      <img src={require('../../assets/img/login.png')} alt={''} />
                    </CardHeader>
                    <CardBody>
                      <div className='author'>
                        <a href='/#' onClick={(e) => e.preventDefault()}>
                          <img
                            alt='...'
                            className='avatar border-gray'
                            src={this.state.image}
                          />
                          <h5 className='title'>{this.props.user.User_name}</h5>
                        </a>
                        <p className='description'>
                          {this.props.user.User_role === 1
                            ? 'Administrator'
                            : 'Viewer'}
                        </p>
                      </div>
                      <p className='description text-center'>
                        Some fancy about me
                        <br />
                        description
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col className='ml-auto mr-auto text-center' md='6'>
                  <Card className='card-user'>
                    <CardHeader className='image'>
                      <img src={require('../../assets/img/login.png')}  alt={''}  />
                    </CardHeader>
                    <CardBody>
                      <div className='author'>
                        <a href='/#' onClick={(e) => e.preventDefault()}>
                          <img
                            alt='...'
                            className='avatar border-gray'
                            src={this.state.image}
                          />
                          <h5 className='title'>{this.props.user.User_name}</h5>
                        </a>
                        <p className='description'>
                          {this.props.user.User_role === 1
                            ? 'Administrator'
                            : 'Viewer'}
                        </p>
                      </div>
                      <p className='description text-center'>
                        Some fancy about me
                        <br />
                        description
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

Users.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  message: state.auth.message,
})

export default connect(mapStateToProps)(Users)
