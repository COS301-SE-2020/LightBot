import React from "react";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import PanelHeader from "../../components/PanelHeader/PanelHeader.js";

class FullScreenMap extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>Simulation</CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    {/* place iframe here */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default FullScreenMap;
