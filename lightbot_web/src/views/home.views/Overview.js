import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from 'reactstrap'

// core components
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

import {
  dashboardPanelChart,
  dashboardAllProductsChart,
} from '../../variables/charts.js'

import Post from '../../components/Post/Post'



class Overview extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      labelsx: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ],
      datax: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
      data: (canvas) => {
        const ctx = canvas.getContext('2d')
        var chartColor = '#FFFFFF'
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
        gradientStroke.addColorStop(0, '#80b6f4')
        gradientStroke.addColorStop(1, chartColor)
        var gradientFill = ctx.createLinearGradient(0, 200, 0, 50)
        gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)')
        gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.14)')
    
        return {
          labels: this.state.labelsx,
          datasets: [
            {
              label: 'Data',
              borderColor: chartColor,
              pointBorderColor: chartColor,
              pointBackgroundColor: '#2c2c2c',
              pointHoverBackgroundColor: '#2c2c2c',
              pointHoverBorderColor: chartColor,
              pointBorderWidth: 1,
              pointHoverRadius: 7,
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              fill: true,
              backgroundColor: gradientFill,
              borderWidth: 2,
              data: this.state.datax,
            },
          ],
        }
      }

    }
  }

  render() {
    return (
      <>
      <PanelHeader
          content={
            <div className='header text-center'>
              <h2 className='title'>Overview</h2>
            </div>
          }
        />
        <PanelHeader
          size='lg'
          content={
            <Line
              data={this.state.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className='content'>
          <Row>
            <Col xs={12} md={6}>
              <Card className='card-chart'>
                <CardHeader>
                  <h5 className='card-category'>2020 Sales</h5>
                  <CardTitle tag='h4'>All products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className='btn-round btn-outline-default btn-icon'
                      color='default'
                    >
                      <i className='now-ui-icons loader_gear' />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className='text-danger'>
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className='chart-area'>
                    <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className='stats'>
                    <i className='now-ui-icons arrows-1_refresh-69' /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <h5 className='card-category'>All Persons List</h5>
                  <CardTitle tag='h4'>Employees Stats</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className='text-primary'>
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className='text-right'>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className='text-right'>$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className='text-right'>$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className='text-right'>$56,142</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Post />
        </div>
      </>
    )
  }
}

export default Overview
