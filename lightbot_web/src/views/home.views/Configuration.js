import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import PanelHeader from "../../components/PanelHeader/PanelHeader.js";

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
        <div className="content">
          <Row>
            <Col md={12}>
              <Card>
                <CardBody className="all-icons">
                  <Row>

                        <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                          className="font-icon-list"
                        >
                          <div className="font-icon-detail">
                            <i className={"now-ui-icons design_bullet-list-67"} />
                            <p>{"design_bullet-list-67"}</p>
                          </div>
                        </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Configuration;
