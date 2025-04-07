import { Col, Row } from "react-bootstrap";
import { ParameterGraph } from "../ParameterGraph";

export const Parameter = ({ timestamp }) => {
  return (
    <Col xs={12} style={{ maxHeight: "90vh" }}>
      <Row className="shadow-md rounded border m-1 p-1">
        <Col lg={6}>
          <p>
            <strong>Cloud: </strong>Azure
          </p>
          <p>
            <strong>Device Name: </strong>westiotedgedevice
          </p>
        </Col>
        <Col lg={6}>
          <p>
            <strong>Last Data Recieved On: </strong>
            {timestamp}
          </p>
          {timestamp && (
            <p>
              <strong>Expected Next Data Arrival: </strong>
              {new Date(
                new Date(timestamp).getTime() + 60 * 1000
              ).toISOString()}
            </p>
          )}
        </Col>
      </Row>
      <Row className="shadow-lg rounded m-2 p-2">
        <ParameterGraph />
      </Row>
    </Col>
  );
};
