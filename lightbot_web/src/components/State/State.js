import React from 'react'

import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'

export default (props) => {
  let text1 = 'text-danger'
  let text1b = 'text-success'
  if (props.adC.toFixed(2) < 0) {
    text1 = 'text-success'
    text1b = 'text-danger'
  }
  let text2 = 'text-danger'
  let text2b = 'text-success'
  if (props.adF.toFixed(2) < 0) {
    text2 = 'text-success'
    text2b = 'text-danger'
  }
  let text3 = 'text-danger'
  let text3b = 'text-success'
  if (props.dcpl.toFixed(2) < 0) {
    text3 = 'text-success'
    text3b = 'text-danger'
  }
  let text4 = 'text-danger'
  let text4b = 'text-success'
  if (props.totWA - props.totWM < 0) {
    text4 = 'text-success'
    text4b = 'text-danger'
  }
  let text5 = 'text-danger'
  let text5b = 'text-success'
  if (props.totWCA - props.totWCM < 0) {
    text5 = 'text-success'
    text5b = 'text-danger'
  }
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
              <th>Automatic</th>
              <th> Manual </th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody className='text-light'>
            <tr>
              <td>Total Carbon Emissions</td>
              <td className={text1}>{props.avC.toFixed(2)} kg</td>
              <td className={text1b}>{props.amC.toFixed(2)} kg</td>
              <td className={text1}>{props.adC.toFixed(2)} kg</td>
            </tr>
            <tr>
              <td>Total Fuel Consumption South</td>
              <td className={text2}>{props.avF.toFixed(2)} litres</td>
              <td className={text2b}>{props.amF.toFixed(2)} litres</td>
              <td className={text2}>{props.adF.toFixed(2)} llitres</td>
            </tr>
            <tr>
              <td>Estimated Fuel Cost (at R14.83 p/l)</td>
              <td className={text3}>R {props.acpl.toFixed(2)}</td>
              <td className={text3b}>R {props.mcpl.toFixed(2)}</td>
              <td className={text3}>R {props.dcpl.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Waiting Time</td>
              <td className={text4}>{props.totWA.toFixed(2)} min</td>
              <td className={text4b}>{props.totWM.toFixed(2)} min</td>
              <td className={text4}>
                {(props.totWA - props.totWM).toFixed(2)} min
              </td>
            </tr>
            <tr>
              <td>Estimated monetary value of time lost due to traffic.</td>
              <td className={text5}>R{props.totWCA.toFixed(2)}</td>
              <td className={text5b}>R{props.totWCM.toFixed(2)}</td>
              <td className={text5}>
                R{(props.totWCA - props.totWCM).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
