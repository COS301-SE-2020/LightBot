import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'
import MapView from '../../components/MapView/MapView'
import Display from '../../components/Display/Display.js'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

class Visualizer extends React.Component {
  state = {
    view: null,
    title: 'JanShoba Peak Traffic (MultiIntersection)',
  }
  handleSwap = (title,link) => {
    this.setView(title,5000,'scenarios/'+link+'/')
  }
  setView = (titleX,portX,linkX) => {
    let { view } = this.state
    view = Display({ title: titleX, port: portX , link: linkX})
    this.setState({view})
  }
  componentDidMount() {
    this.setView('JanShoba Peak Traffic (MultiIntersection)',5000,'')
  }
  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Intersection Visualizer</h2>{' '}
            </div>
          }
        />
        <div className='content'>
          <Row>
            {/* <Col md='6'>
              <Display title={'Manual'} port={5000} />
            </Col> */}
            <Col md='9' className='ml-auto mr-auto text-center'>
              {this.state.view}
            </Col>
            <Col md='3' className='ml-auto mr-auto text-center'>
              <Card
                style={{ backgroundColor: '#2a2a2a' }}
                className='text-primary'
              >
                <CardHeader>
                  <CardTitle tag='h4' className='ml-auto mr-auto text-center'>
                    Toggle Intersections
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={() => {
                      this.handleSwap('JanShoba Low Traffic (MultiIntersection)','janshoba-multiple-intersections-midnight')
                    }}
                  >
                    <div className='font-icon-detail'>
                      JanShoba Low Traffic (MultiIntersection)
                    </div>
                  </Button>
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={() => {
                      this.handleSwap('JanShoba Normal Traffic (MultiIntersection)','janshoba-multiple-intersections-normal')
                    }}
                  >
                    <div className='font-icon-detail'>
                      JanShoba Normal Traffic (MultiIntersection)
                    </div>
                  </Button>
                  <Button
                    value={'JanShoba_Multiple_Intersections_Peak'}
                    name={'JanShoba Peak Traffic (MultiIntersection)'}
                    className='btn-round'
                    color='primary'
                    block
                    onClick={() => {
                      this.handleSwap('JanShoba Peak Traffic (MultiIntersection)','janshoba-multiple-intersections-peak')
                    }}
                  >
                    <div className='font-icon-detail'>
                      JanShoba Peak Traffic (MultiIntersection)
                    </div>
                  </Button>
                  <Button
                    value={'JanShoba_South_Midnight'}
                    name={'South St Low Traffic'}
                    className='btn-round'
                    color='primary'
                    block
                    onClick={() => {
                      this.handleSwap('South St Low Traffic','janshoba-south-midnight')
                    }}
                  >
                    <div className='font-icon-detail'>South St Low Traffic</div>
                  </Button>
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={() => {
                      this.handleSwap('South Normal Traffic','janshoba-south-off-peak')
                    }}
                  >
                    <div className='font-icon-detail'>South Normal Traffic</div>
                  </Button>
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={() => {
                      this.handleSwap('South St Peak Traffic','janshoba-south-peak')
                    }}
                  >
                    <div className='font-icon-detail'>
                      South St Peak Traffic
                    </div>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md='12' className='ml-auto mr-auto text-center'>
              <MapView
                title={'How it looks on the ground!'}
                styles={{ width: '60vw', height: '60vh' }}
              />
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default Visualizer
