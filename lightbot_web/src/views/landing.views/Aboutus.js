import React from 'react'

import { Card, Container, Col, CardHeader } from 'reactstrap'

class Aboutus extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className='page-header clear-filter'>
          <div className='page-header-image'></div>
          <div className='content'>
            <Container>
              <Col className='ml-auto mr-auto black-background' md='12'>
                <Card className='card-login card-plain'>
                <Col className='ml-auto mr-auto' md='6'>
                  <CardHeader className='text-center'>
                    <div className='logo-container'>
                      <img
                        alt='...'
                        src={require('../../assets/img/LightBot_Logo_White.png')}
                      ></img>
                    </div>
                  </CardHeader>
                </Col>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
      </>
    )
  }
}

export default Aboutus
