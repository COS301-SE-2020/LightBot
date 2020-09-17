import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { CanvasJSChart } from 'canvasjs-react-charts'

export default (props) => {
  console.log(props.data1)
  const options = {
    animationEnabled: true,
    theme: 'dark1',
    axisY: {
      title: props.titleY,
    },
    axisX: {
      title: props.titleX,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: props.name1,
        showInLegend: true,
        dataPoints: props.data1,
      },
      {
        type: 'spline',
        name: props.name2,
        showInLegend: true,
        dataPoints: props.data2,
      },
    ],
  }

  return (
    <Card style={{ backgroundColor: '#2a2a2a' }} className='text-primary'>
      <CardHeader>
        <CardTitle tag='h4' className='ml-auto mr-auto text-center'>
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className='chart-area'>
          <CanvasJSChart options={options} />
        </div>
      </CardBody>
    </Card>
  )
}
