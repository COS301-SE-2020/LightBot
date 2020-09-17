import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import Map from '../Map/MapComponent'


export default (props) => {
  return (
    <Card style={{ backgroundColor: '#2a2a2a', width: '80vw', height: '80vh' }} className='text-primary'>
        <CardHeader>
        <CardTitle tag='h4' className='ml-auto mr-auto text-center'>{props.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <Map/>
        </CardBody>
      </Card>
  )
}
