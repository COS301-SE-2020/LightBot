import React from 'react'
import {
  Card,
  Label,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'
import PanelHeader from '../../components/PanelHeader/PanelHeader.js'

import Post from '../../components/Post/Post'

class RegularTables extends React.Component {
  render() {
    return (
      <>
        <PanelHeader
          size='sm'
          content={
            <div className='header text-center'>
              <h2 className='title'>Notification Forum</h2>
            </div>
          }
        />
        <div className='content'>
          <Post/>
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6} className='ml-auto mr-auto text-center'>
                      <CardTitle tag='h4'>Submit New Forum Post</CardTitle>
                    </Col>
                  </Row>
                  <Form>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='3'>
                        <FormGroup>
                          <label>Title</label>
                          <Input maxLength='30' placeholder='Title' type='text' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='4'>
                        <FormGroup>
                          <label>Subject</label>
                          <Input maxLength='50' placeholder='Subject' type='text' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center'>
                        <label>Urgency</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='1'>
                        <Row>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type='radio'
                                name='radio1'
                                value='emergency'
                              />{' '}
                              emergency
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type='radio'
                                name='radio1'
                                value='warning'
                              />{' '}
                              warning
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type='radio' name='radio1' value='info' />{' '}
                              info
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type='radio'
                                name='radio1'
                                value='success'
                              />{' '}
                              success
                            </Label>
                          </FormGroup>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md='6'>
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            maxLength='250'
                            cols='80'
                            placeholder='Your text Here...'
                            rows='4'
                            type='textarea'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ml-auto mr-auto text-center' md={4}>
                        <Button
                          className='btn-round'
                          color='primary'
                          block
                          onClick={() => {}}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default RegularTables
