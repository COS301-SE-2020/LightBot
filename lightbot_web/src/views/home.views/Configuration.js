import React from 'react'
import { Card, CardBody, Row, Col, Button } from 'reactstrap'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class Configuration extends React.Component {
  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Configuration</h2>
            </div>
          }
        />
        <div className='content'>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody className='all-icons ml-auto mr-auto'>
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
                        Manual Control
                        <div className='font-icon-detail'>
                          <i className={'now-ui-icons design_bullet-list-67'} />
                          <p>{'design_bullet-list-67'}</p>
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
                        Intersections
                        <div className='font-icon-detail'>
                          <i className={'now-ui-icons design_bullet-list-67'} />
                          <p>{'design_bullet-list-67'}</p>
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
                        AI Parameters
                        <div className='font-icon-detail'>
                          <i className={'now-ui-icons design_bullet-list-67'} />
                          <p>{'design_bullet-list-67'}</p>
                        </div>
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default Configuration
