import React from 'react'

import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'

export default (props) => {
  let text1 = 'text-danger'
  let text2 = 'text-danger'
  let text3 = 'text-danger'
  let text4 = 'text-danger'
  let text5 = 'text-danger'
  if (props.tF) text1 = 'text-success'
  if (props.tC) text2 = 'text-success'
  if (props.tW) text3 = 'text-success'
  if (props.tDW) text4 = 'text-success'
  if (props.tSW) text5 = 'text-success'
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
              <td>Total South Wait Time</td>
              <td className={text5}>{props.sW.toFixed(2)} minutes</td>
            </tr>
            <tr>
              <td>Estimated Monetary Cost at South Street</td>
              <td className={text5}>R{props.sWC.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Duxbury Wait Time </td>
              <td className={text4}>{props.dW.toFixed(2)} minutes</td>
            </tr>
            <tr>
              <td>Estimated Monetary Cost at Duxbury Street</td>
              <td className={text4}>R{props.dWC.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Waiting time </td>
              <td className={text3}>{props.totW.toFixed(2)} minutes</td>
            </tr>
            <tr>
              <td>Total Estimated Cost of Both Intersections</td>
              <td className={text3}>R{props.totWC.toFixed(2)}</td>
            </tr>
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
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
