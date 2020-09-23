import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { LineChart, Line, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts'

export default (props) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let dif = (payload[0].value - payload[1].value).toFixed(2)
      let text = ''
      if (dif < 0) text = 'text-success'
      else text = 'text-danger'
      return (
        <Card
          style={{ backgroundColor: '#1a1a1a', fontSize: '12px' }}
          className='text-primary'
        >
          <div className='text-secondary'>{`Time: ${label}`}</div>
          <div>{`Automatic: ${payload[0].value.toFixed(2)}`}</div>
          <div className='text-light'>{`Manual: ${payload[1].value.toFixed(
            2
          )}`}</div>
          <div className={text}>Difference: {dif}</div>
        </Card>
      )
    }

    return null
  }

  return (
    <Card style={{ backgroundColor: '#2a2a2a' }} className='text-primary'>
      <CardHeader>
        <CardTitle tag='h4' className='ml-auto mr-auto text-center'>
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardBody className='text-secondary'>
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
            <Tooltip cursor={false} content={<CustomTooltip />} />
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
