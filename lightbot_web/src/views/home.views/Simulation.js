import React from 'react'
import { MDBIframe } from 'mdbreact'
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap'
import { Line } from 'react-chartjs-2'

import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

import { dashboardAllProductsChart } from '../../variables/charts.js'

class Simulation extends React.Component {
  state = {
    dropdownOpen: false,
  }

  dropdownToggle = (e) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Simulation</h2>
            </div>
          }
        />
        <div className='content'>
          <Row>
            <Card>
              <CardBody>
                <Col md={6} className='ml-auto mr-auto text-center'>
                  <h4>Select an intersection to run on the comparison simulator.</h4>
                  <Col md={3} className='ml-auto mr-auto text-center'>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                    <DropdownToggle caret>Dropdown</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Intersections</DropdownItem>
                      <DropdownItem>Jan Shoba & South</DropdownItem>
                      <DropdownItem>Jan Shoba & Duxbury</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  </Col>
                  <Col md={3} className='ml-auto mr-auto text-center'>
                    <Button className='btn-round' color='primary' block>
                      <div className='font-icon-detail'>
                        <i className={'now-ui-icons media-1_button-play'} />
                      </div>
                    </Button>
                  </Col>
                </Col>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Col xs={6}>
              <Card>
                <CardBody>
                  <MDBIframe src='http://ec2-18-157-183-138.eu-central-1.compute.amazonaws.com:5000/' />
                </CardBody>
              </Card>
            </Col>
            <Col xs={6}>
              <Card>
                <CardBody>
                  <MDBIframe src='http://ec2-18-157-183-138.eu-central-1.compute.amazonaws.com:5000/' />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Card>
                <CardBody>
                  <div className='chart-area'>
                    <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs={6}>
              <Card>
                <CardBody>
                  <div className='chart-area'>
                    <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default Simulation
