import React from 'react'

import {
  Button,
  Card,
  CardFooter,
  Form,
  Container,
  Col,
} from 'reactstrap'

class ErrorPage extends React.Component {
    onSubmitHandler = () => {
      this.props.history.push('/login')
    }
  render() {
    
    return (
      <>
      <div className="meow" ref={this.mainPanel}>
      <div className="wrapper" style={MyStyles.wrap}>
      <div className='content'>
          <Container>
            <Col className='ml-auto mr-auto' md='4' style={MyStyles.loginPanel}>
              <Card className='card-login card-plain'>
                <Form action='' className='form' method=''>
                  <CardFooter className='text-center'>
                    <Button
                      block
                      className='btn-round'
                      color='primary'
                      onClick={this.onSubmitHandler}
                      size='lg'
                    >
                      Return to Home
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
      </div>
      </>
    )
  }
}

const MyStyles = {
  wrap:{
    backgroundImage: 'url('+require('../../assets/img/Error_image.gif')+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}

export default ErrorPage