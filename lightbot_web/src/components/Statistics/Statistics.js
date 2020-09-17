import React from 'react'

import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'

export default (props) => {
  return (
    <Card style={{ backgroundColor: '#2a2a2a' }} className='text-primary'>
    <CardHeader>
    <CardTitle tag='h4' className='ml-auto mr-auto text-center'>{props.title}</CardTitle>
    </CardHeader>
    <CardBody>
    <Table responsive>
          <thead className='text-primary'>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody className='text-light'>
            <tr>
              <td>Total Carbon Emissions (g)</td>
              <td className='text-success'>{props.avC.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Fuel Consumption (litres)</td>
              <td className='text-danger'>{props.avF.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Estimated Fuel Cost in Rands (at R14.83 p/l)</td>
              <td className='text-danger'>{props.cpl.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
    </CardBody>
  </Card>
  )
}
