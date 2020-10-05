import React from 'react'
import logo from '../../assets/img/LightBot_Logo_White.png'

import { Row, Col } from 'reactstrap'

// core components
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'
import Graph from '../../components/Graph/Graph.js'
import State from '../../components/State/State.js'
import Post from '../../components/Post/Post'
import MapView from '../../components/MapView/MapView'
import { pullData } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: null,
      view2: null,
    }
  }
  setView = () => {
    let { view } = this.state
    view = this.handleLoad()
    this.setState({ view })
  }
  setView2 = () => {
    let { view2 } = this.state
    view2 = this.handleLoad2()
    this.setState({ view2 })
  }
  handleLoad = () => {
    return (
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
    )
  }
  handleLoad2() {
    let avCM = this.cumulate(this.props.data.fiveM.dataset)
    let avFM = this.cumulate(this.props.data.sixM.dataset)
    let avCA = this.cumulate(this.props.data.fiveA.dataset)
    let avFA = this.cumulate(this.props.data.sixA.dataset)
    let totWA = this.cumulate(this.props.data.threeA.dataset)
    let totWM = this.cumulate(this.props.data.threeM.dataset)
    return (
      <>
        <Row>
          <Col xs={12} md={6} className='ml-auto mr-auto text-center'>
            <State
              title={
                'State of Latest run (Duration: ' +
                this.props.data.fourM.dataset.length +
                ' seconds)'
              }
              avC={avCA / 1000000}
              amC={avCM / 1000000}
              adC={(avCA - avCM) / 1000000}
              avF={avFA / 1000}
              amF={avFM / 1000}
              adF={(avFA - avFM) / 1000}
              acpl={(avFA / 1000) * 14.83}
              mcpl={(avFM / 1000) * 14.83}
              dcpl={((avFA - avFM) / 1000) * 14.83}
              totWM={totWM / 60}
              totWCM={(totWM / 60) * (22500 / 20 / 8 / 60)}
              totWA={totWA / 60}
              totWCA={(totWA / 60) * (22500 / 20 / 8 / 60)}
            />
          </Col>
          <Col xs={12} md={6} className='ml-auto mr-auto text-center'>
            <div style={bannerStyles}>
              <div className='ml-auto mr-auto text-center'>
                <img
                  src={logo}
                  style={{
                    width: '85%',
                    height: '85%',
                    marginTop: '-5%',
                    paddingBottom: '-20%',
                  }}
                  alt='react-logo'
                />
                <div style={{ color: 'white', fontSize: '25px' }}>
                  <div>View the lightbot system state</div>
                  <div>Compare the latest results</div>
                  <div>Measure the gains in time efficiency</div>
                  <br></br>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }

  cumulate = (p) => {
    let tot = 0
    p.map((element, key) => {
      tot += element
      return tot
    })
    return tot
  }
  async componentWillMount() {
    try {
      await this.props.pullData()
      if (this.props.message.status > 299) {
      } else {
        this.setView2()
        this.setView()
      }
    } catch (err) {}
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
          {this.state.view2}
          {this.state.view}
          <Post setClick={(click) => (this.clickChild = click)} />
          <Row>
            <Col md='12' className='ml-auto mr-auto text-center'>
              <MapView title={'Intersections Covered'} />
            </Col>
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
  pullData: PropTypes.func.isRequired,
  message: PropTypes.object,
  data: PropTypes.object,
}

const mapStateToProps = (state) => ({
  message: state.auth.message,
  data: state.auth.scenario_data,
})

export default connect(mapStateToProps, {
  pullData,
})(Overview)
