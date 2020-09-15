import React from 'react'

import { Card, CardBody, Row, Col, CardHeader } from 'reactstrap'

export default (props) => {
  return (
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
                  src={props.avatar}
                />
                <h5 className='title'>
                  {props.name} {props.surname}
                </h5>
              </a>
              <p className='description'>
                {props.role === 1 ? 'Administrator' : 'Viewer'}
              </p>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}