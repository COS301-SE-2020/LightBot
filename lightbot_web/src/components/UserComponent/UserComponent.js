import React from 'react'

import { Card, CardBody, Row, Col, CardHeader, Button } from 'reactstrap'

export default (props) => {

  
  return (
    <Row>
      <Col className='ml-auto mr-auto text-center' md='6'>
        <Card className='card-user'>
          <CardHeader className='image'>
            <img src={require('../../assets/img/profile.jpg')} alt={''} />
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
                {props.role === 1 ? 'Administrator' : 'Regular'}
              </p>
            </div>
            <Row>
              <Col className='ml-auto mr-auto text-center' md='3'>
                <Button
                  className='btn-round'
                  color='success'
                  block
                  onClick={()=>{props.handleC(props.elevate,1)}}
                >
                  Promote
                </Button>
              </Col>
              <Col className='ml-auto mr-auto text-center' md='3'>
                <Button
                  className='btn-round'
                  color='danger'
                  block
                  onClick={()=>{props.handleC(props.elevate,2)}}
                >
                  Demote
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
