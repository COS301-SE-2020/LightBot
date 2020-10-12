import React from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from 'reactstrap'
import { runSim, pushData, pullData } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'
import NotificationAlert from 'react-notification-alert'
import Loading from '../../components/Loading/Loading.js'
import Graph from '../../components/Graph/Graph.js'
import Statistics from '../../components/Statistics/Statistics'

class Simulation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      loading: null,
      view: null,
      numV: 100,
      durS: 500,
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
  }

  setNumV = (e) => {
    let { numV } = this.state
    numV = e.target.value
    this.setState({ numV })
  }
  setDurS = (e) => {
    let { durS } = this.state
    durS = e.target.value
    this.setState({ durS })
  }

  dropdownToggle = (e) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  async handleSimulation() {
    let { loading } = this.state
    loading = Loading()
    this.setState({ loading })
    try {
      await this.props.runSim(this.state.numV, this.state.durS)
      if (this.props.message.status > 299) {
        this.notify(this.props.message.msg, 'danger')
        loading = null
        this.setState({ loading })
      } else {
        this.notify(this.props.message.msg, 'success')
        loading = null
        this.setState({ loading })
        await this.props.pushData()
        if (this.props.message.status > 299) {
          this.notify(this.props.message.msg, 'danger')
        } else {
          await this.props.pullData()
          if (this.props.message.status > 299) {
            this.notify(this.props.message.msg, 'danger')
          } else {
            this.notify(this.props.message.msg, 'success')
            this.setView()
          }
        }
      }
    } catch (err) {}
  }
  setView = () => {
    let { view } = this.state
    view = this.handleLoad()
    this.setState({ view })
  }
  handleLoad = () => {
    let avCM = this.cumulate(this.props.data.fiveM.dataset)
    let avFM = this.cumulate(this.props.data.sixM.dataset)
    let avCA = this.cumulate(this.props.data.fiveA.dataset)
    let avFA = this.cumulate(this.props.data.sixA.dataset)
    let totWA = this.cumulate(this.props.data.threeA.dataset)
    let totWM = this.cumulate(this.props.data.threeM.dataset)
    let textCarbon = false
    let textFuel = false
    let textWait = false
    if (avCA - avCM < 0) {
      textCarbon = true
    }
    if (avFA - avFM < 0) {
      textFuel = true
    }
    if (totWA - totWM < 0) {
      textWait = true
    }
    return (
      <>
        <Row>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Graph
              type={'line'}
              title={'Duxbury Queue Length'}
              titleY={'Cumulative Queue Length (Vehicles)'}
              titleX={'Duration Step'}
              name1={'Automatic'}
              name2={'Manual'}
              data={this.props.data.oneM.dataset.map((element, key) => {
                return {
                  y2: element,
                  x: key,
                  y1: this.props.data.oneA.dataset[key],
                }
              })}
            />
          </Col>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Graph
              type={'line'}
              title={'Duxbury Wait Time'}
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
        </Row>
        <Row>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Graph
              type={'line'}
              title={'South Queue Length'}
              titleY={'Cumulative Queue Length (Vehicles)'}
              titleX={'Duration Step'}
              name1={'Automatic'}
              name2={'Manual'}
              data={this.props.data.twoM.dataset.map((element, key) => {
                return {
                  y2: element,
                  x: key,
                  y1: this.props.data.twoA.dataset[key],
                }
              })}
            />
          </Col>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Graph
              type={'line'}
              title={'South Wait Time'}
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
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Graph
              type={'line'}
              title={'Total CO2 Emissions'}
              titleY={'Cumulative Emissions (g/s)'}
              titleX={'Duration Step'}
              name1={'Automatic'}
              name2={'Manual'}
              data={this.props.data.fiveM.dataset.map((element, key) => {
                return {
                  y2: element / 1000,
                  x: key,
                  y1: this.props.data.fiveA.dataset[key] / 1000,
                }
              })}
            />
          </Col>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Graph
              type={'line'}
              title={'Total Fuel Consumption'}
              titleY={'Cumulative Fuel Consumed (ml/s)'}
              titleX={'Duration Step'}
              name1={'Automatic'}
              name2={'Manual'}
              data={this.props.data.sixM.dataset.map((element, key) => {
                return {
                  y2: element,
                  x: key,
                  y1: this.props.data.sixA.dataset[key],
                }
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Statistics
              title={
                'Manual Statistics (' +
                this.props.data.fourM.dataset.length +
                ' seconds)'
              }
              avC={avCM / 1000000}
              avF={avFM / 1000}
              cpl={(avFM * 14.89) / 1000}
              totW={totWM / 60}
              totWC={(totWM / 60) * (22500 / 20 / 8 / 60)}
              tF={!textFuel}
              tC={!textCarbon}
              tW={!textWait}
            />
          </Col>
          <Col md='6' className='ml-auto mr-auto text-center'>
            <Statistics
              title={
                'Automatic Statistics (' +
                this.props.data.fourM.dataset.length +
                ' seconds)'
              }
              avC={avCA / 1000000}
              avF={avFA / 1000}
              cpl={(avFA * 14.89) / 1000}
              totW={totWA / 60}
              totWC={(totWA / 60) * (22500 / 20 / 8 / 60)}
              tF={textFuel}
              tC={textCarbon}
              tW={textWait}
            />
          </Col>
        </Row>
        <Card style={{ backgroundColor: '#2a2a2a' }}>
          <CardBody>
            <Row>
              <Col md='12' className='ml-auto mr-auto text-left'>
                <div className='text-secondary'>
                  1 second is equivalent to 1 timestep
                  <br />
                  Information in tables represent totals of respective data in
                  the last simulation.
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
                  African income of R22500 per month , 20 workdays per month, 8
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
          </CardBody>
        </Card>
      </>
    )
  }

  cumulate = (p) => {
    let tot = 0
    p.map((element, key) => {
      tot += element
    })
    return tot
  }

  onDismiss() {}
  notify(Message, type) {
    var options = {}
    options = {
      place: 'tc',
      message: (
        <div>
          <div>{Message}</div>
        </div>
      ),
      type: type,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 7,
    }
    this.refs.notificationAlert.notificationAlert(options)
  }

  async componentDidMount() {
    this.setView()
  }

  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Scenario Runner</h2>
            </div>
          }
        />
        <div className='content'>
          <NotificationAlert ref='notificationAlert' />
          <Row>
            <Col md={12} className='ml-auto mr-auto text-center'>
              <Card
                style={{ backgroundColor: '#2a2a2a' }}
                className='text-primary'
              >
                <CardBody>
                  <Col md={4} className='ml-auto mr-auto text-center'>
                    <InputGroup>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText className='text-primary'>
                          <i className='now-ui-icons transportation_bus-front-12'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className='text-primary'
                        placeholder='Number of Vehicles'
                        defaultValue={100}
                        min={50}
                        max={1000}
                        type='number'
                        step='5'
                        onChange={(e) => {
                          this.setNumV(e)
                        }}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText className='text-primary'>
                          <i className='now-ui-icons tech_watch-time'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className='text-primary'
                        placeholder='Duration of Simulation'
                        defaultValue={500}
                        min={50}
                        max={2000}
                        type='number'
                        step='5'
                        onChange={(e) => {
                          this.setDurS(e)
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4} className='ml-auto mr-auto text-center'>
                    <Button
                      className='btn-round'
                      color='primary'
                      block
                      onClick={() => {
                        this.handleSimulation()
                      }}
                    >
                      <div className='font-icon-detail'>
                        Compare Multi Intersection{'    '}
                        <i className={'now-ui-icons media-1_button-play'} />
                      </div>
                    </Button>
                    {this.state.loading}
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.state.view}
        </div>
      </>
    )
  }
}
Simulation.propTypes = {
  runSim: PropTypes.func.isRequired,
  pushData: PropTypes.func.isRequired,
  pullData: PropTypes.func.isRequired,
  message: PropTypes.object,
  data: PropTypes.object,
}

const mapStateToProps = (state) => ({
  message: state.auth.message,
  data: state.auth.scenario_data,
})

export default connect(mapStateToProps, {
  runSim,
  pushData,
  pullData,
})(Simulation)
