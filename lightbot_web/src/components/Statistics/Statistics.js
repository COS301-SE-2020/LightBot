import React from 'react'

import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'

export default (props) => {
  let text1 = 'text-danger'
  let text2 = 'text-danger'
  let text3 = 'text-danger'
  if (props.tF) text1 = 'text-success'
  if (props.tC) text2 = 'text-success'
  if (props.totW) text3 = 'text-success'
  return (
    <Card style={{ backgroundColor: '#2a2a2a' }} className='text-primary'>
      <CardHeader>
        <CardTitle tag='h4' className='ml-auto mr-auto text-center'>
          {props.title}
        </CardTitle>
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
              <td>Total Carbon Emissions </td>
              <td className={text2}>{props.avC.toFixed(2)} kg</td>
            </tr>
            <tr>
              <td>Total Fuel Consumption</td>
              <td className={text1}>{props.avF.toFixed(2)} litres</td>
            </tr>
            <tr>
              <td>Estimated Fuel Cost in Rands (at R14.89 p/l)</td>
              <td className={text1}>R{props.cpl.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Waiting time </td>
              <td className={text1}>{props.totW.toFixed(2)} minutes</td>
            </tr>

            <tr>
              <td>Estimated monetary value of time lost due to traffic</td>
              <td className={text1}>R{props.totWC.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
