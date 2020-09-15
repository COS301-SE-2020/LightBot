import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class Configuration extends React.Component {
  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Configuration</h2>{' '}
              <i className={'now-ui-icons loader_gear spin'} />
            </div>
          }
        />
        <div className='content'>
          <Row>
            <Col md={12} xs={4}>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Row>
                <Col
                  lg={2}
                  md={3}
                  sm={3}
                  xs={3}
                  className='font-icon-list ml-auto mr-auto'
                >
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={this.handleUpload}
                  >
                    <div className='font-icon-detail'>
                      <i className={'now-ui-icons design_bullet-list-67'} />
                      <p>{'Intersections'}</p>
                    </div>
                  </Button>
                </Col>
                <Col
                  lg={2}
                  md={3}
                  sm={3}
                  xs={3}
                  className='font-icon-list ml-auto mr-auto'
                >
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={this.handleUpload}
                  >
                    <div className='font-icon-detail'>
                      <i className={'now-ui-icons design_bullet-list-67'} />
                      <p>{'Parameters'}</p>
                    </div>
                  </Button>
                </Col>
                <Col
                  lg={2}
                  md={3}
                  sm={3}
                  xs={3}
                  className='font-icon-list ml-auto mr-auto'
                >
                  <Button
                    className='btn-round'
                    color='primary'
                    block
                    onClick={this.handleUpload}
                  >
                    <div className='font-icon-detail'>
                      <i className={'now-ui-icons design_bullet-list-67'} />
                      <p>{'Executions'}</p>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default Configuration
