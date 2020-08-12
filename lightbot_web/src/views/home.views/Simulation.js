import React from 'react'
import { MDBIframe } from 'mdbreact'
import { Row, Col, Card, CardBody } from 'reactstrap'

import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

class FullScreenMap extends React.Component {
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
            <Col xs={12}>
              <Card>
                <CardBody>
                  <MDBIframe src='https://www.youtube.com/embed/v64KOxKVLVg' />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default FullScreenMap
