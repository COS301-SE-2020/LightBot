import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { LineChart, Line, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts'

export default (props) => {
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
          <LineChart
            data={props.data}
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis dataKey='x'>
              <Label
                value={props.titleX}
                offset={0}
                position='insideBottomRight'
                style={{
                  fontSize: '12px',
                  fill: '#FFFFFF',
                }}
              />
            </XAxis>
            <YAxis>
              <Label
                value={props.titleY}
                angle={-90}
                position='insideBottomLeft'
                style={{
                  fontSize: '12px',
                  fill: '#FFFFFF',
                }}
              />
            </YAxis>
            <Tooltip cursor={false} />
            <Legend />
            <Line
              name={props.name1}
              type='monotone'
              dataKey='y1'
              stroke='#F96332'
              activeDot={{ r: 2 }}
              dot={false}
            />
            <Line
              name={props.name2}
              type='monotone'
              dataKey='y2'
              stroke='#FFFFFF'
              activeDot={{ r: 2 }}
              dot={false}
            />
          </LineChart>
        </div>
      </CardBody>
    </Card>
  )
}
