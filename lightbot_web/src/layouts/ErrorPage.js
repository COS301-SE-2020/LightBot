import React from 'react'
import Footer from '../components/Footer/Footer.js'
import PerfectScrollbar from "perfect-scrollbar";

import {
  Button,
  Card,
  CardFooter,
  Form,
  Container,
  Col,
} from 'reactstrap'

var ps;

class ErrorPage extends React.Component {
  
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }
    onSubmitHandler = () => {
      this.props.history.push('/landing/login')
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
      <Footer fluid />
      </>
    )
  }
}

const MyStyles = {
  wrap:{
    backgroundImage: 'url('+require('../assets/img/Error_image.gif')+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}

export default ErrorPage