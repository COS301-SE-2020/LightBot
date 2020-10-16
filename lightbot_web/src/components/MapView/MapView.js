import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
import Map from '../Map/MapComponent'


export default (props) => {
  return (
    <Col md='12' className='ml-auto mr-auto text-center text-primary'>
      <Card md='12' className='ml-auto mr-auto text-center' style={{ backgroundColor: '#2a2a2a'}}>
        <CardHeader>
        <CardTitle tag='h4' className='ml-auto mr-auto text-center'>{props.title}</CardTitle>
        </CardHeader>
        <CardBody md='12' className='ml-auto mr-auto text-center' style={{padding:'0',height:'35vw'}}>
          <Map/>
        </CardBody>
      </Card>
    </Col>
    
  )
}
