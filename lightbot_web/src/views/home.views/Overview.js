import React from 'react'
import logo from '../../assets/img/LightBot_Logo_White.png'
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'
import Graph from '../../components/Graph/Graph.js'
import State from '../../components/State/State.js'
import Post from '../../components/Post/Post'
import MapView from '../../components/MapView/MapView'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Overview extends React.Component {
  cumulate = (p) => {
    let tot = 0
    p.map((element, key) => {
      tot += element
      return tot
    })
    return tot
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
        <div className='content' style={{ marginTop: '30px' }}>
          <Row>
            <Col xs={12} md={6} className='ml-auto mr-auto text-center'>
              <div style={bannerStyles}>
                <div className='ml-auto mr-auto text-center'>
                  <img
                    src={logo}
                    style={{
                      width: '85%',
                      height: '80%',
                      marginTop: '-5%',
                    }}
                    alt='react-logo'
                  />
                  <div style={{ color: 'white', fontSize: '25px', paddingTop: '-10px' }}>
                    <div>View the lightbot system state</div>
                    <div>Compare the latest results</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} className='ml-auto mr-auto text-center'>
              <State
                title={
                  'State of Latest run (Duration: ' +
                  this.props.data.fourM.dataset.length +
                  ' seconds)'
                }
                avC={this.cumulate(this.props.data.fiveA.dataset) / 1000000}
                amC={this.cumulate(this.props.data.fiveM.dataset) / 1000000}
                adC={
                  (
                    this.cumulate(this.props.data.fiveM.dataset)-this.cumulate(this.props.data.fiveA.dataset)) /
                  1000000
                }
                avF={this.cumulate(this.props.data.sixA.dataset) / 1000}
                amF={this.cumulate(this.props.data.sixM.dataset) / 1000}
                adF={
                  (
                    this.cumulate(this.props.data.sixM.dataset)-this.cumulate(this.props.data.sixA.dataset)) /
                  1000
                }
                acpl={
                  (this.cumulate(this.props.data.sixA.dataset) / 1000) * 14.89
                }
                mcpl={
                  (this.cumulate(this.props.data.sixM.dataset) / 1000) * 14.89
                }
                dcpl={
                  ((  this.cumulate(this.props.data.sixM.dataset)-this.cumulate(this.props.data.sixA.dataset) ) /
                    1000) *
                  14.89
                }
                totWM={this.cumulate(this.props.data.threeM.dataset) / 60}
                totWCM={
                  (this.cumulate(this.props.data.threeM.dataset) / 60) *
                  (22500 / 21 / 8 / 60)
                }
                totWA={this.cumulate(this.props.data.threeA.dataset) / 60}
                totWCA={
                  (this.cumulate(this.props.data.threeA.dataset) / 60) *
                  (22500 / 21 / 8 / 60)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} className='ml-auto mr-auto text-center'>
              <Graph
                title={'Visualisation of Latest Run Waiting Times on Duxbury'}
                titleY={'Cumulative Wait Time (min)'}
                titleX={'Duration Step'}
                name1={'Automatic'}
                name2={'Manual'}
                data={this.props.data.threeM.dataset.map((element, key) => {
                  return {
                    y2: element / 60,
                    x: key,
                    y1: this.props.data.threeA.dataset[key] / 60,
                  }
                })}
              />
            </Col>
            <Col xs={12} md={6} className='ml-auto mr-auto text-center'>
              <Graph
                title={'Visualisation of Latest Run Waiting Times on South'}
                titleY={'Cumulative Wait Time (min)'}
                titleX={'Duration Step'}
                name1={'Automatic'}
                name2={'Manual'}
                data={this.props.data.fourM.dataset.map((element, key) => {
                  return {
                    y2: element / 60,
                    x: key,
                    y1: this.props.data.fourA.dataset[key] / 60,
                  }
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              md={11}
              className='ml-auto mr-auto'
              style={{ backgroundColor: '#2a2a2a' }}
            >
              <div className='text-secondary'>
                Information in tables represent totals of respective data in the
                last simulation.
                <br />
                Graphs represent data of the last simualtion.
                <br />
                Estimated fuel cost of R14.89 p/l based on inland fuel prices
                for Petrol Unleaded 93 on the 02-09-2020. (
                <a
                  href='https://www.aa.co.za/calculators-toolscol-1/fuel-pricing'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  Source
                </a>
                ).
                <br />
                Monetary value lost to traffic calculated using average South
                African income of R22500 per month , 21 workdays per month, 8
                hours worked per day (
                <a
                  href='https://businesstech.co.za/news/finance/386327/this-is-the-average-salary-in-south-africa-right-now-4/'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  Source
                </a>
                ).
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col md='12'>
              <Card
                className='card-user'
                style={{ backgroundColor: '#2a2a2a' }}
              >
                <CardHeader className='ml-auto mr-auto text-center text-primary'>
                  <h2>Notification Forum</h2>
                </CardHeader>
                <CardBody>
                  <Post setClick={(click) => (this.clickChild = click)} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <MapView title={'Intersections Covered'} />
          </Row>
        </div>
      </>
    )
  }
}
const bannerStyles = {
  margin: 'auto',
  width: '100%',
  height: '93%',
  backgroundImage: 'url(' + require('../../assets/img/profile.jpg') + ')',
  backgroundSize: 'cover',
}

Overview.propTypes = {
  message: PropTypes.object,
  data: PropTypes.object,
}

const mapStateToProps = (state) => ({
  message: state.auth.message,
  data: state.auth.scenario_data,
})

export default connect(mapStateToProps)(Overview)
