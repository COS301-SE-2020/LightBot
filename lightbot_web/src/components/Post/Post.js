import React from 'react'
import { tbody } from '../../variables/general'
import {
    Card,
    CardBody,
    Table,
    Row,
    Col,
    Alert,
  } from 'reactstrap'
const thead = ["Date/Time","Title", "Subject", "Creator"];

class Post extends React.Component {
  render() {
    return (
        <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <Table responsive>
                <thead className='text-primary'>
                  <tr>
                    {thead.map((prop, key) => {
                      if (key === thead.length - 1)
                        return (
                          <th key={key} className='text-right'>
                            {prop}
                          </th>
                        )
                      return <th key={key}>{prop}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {tbody.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {prop.data.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <td key={key} className='text-right'>
                                {prop}
                              </td>
                            )
                          return <td key={key}>{prop}</td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Post
