import React from 'react'
import { MDBIframe } from 'mdbreact'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

export default (props) => {
  return (
    <Card style={{ backgroundColor: '#2a2a2a' }} className='text-primary'>
        <CardHeader>
        <CardTitle tag='h4' className='ml-auto mr-auto text-center'>{props.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <MDBIframe
            src={
              'http://ec2-18-192-23-11.eu-central-1.compute.amazonaws.com:' +
              props.port +
              '/'+props.link
            }
          />
        </CardBody>
      </Card>
  )
}
