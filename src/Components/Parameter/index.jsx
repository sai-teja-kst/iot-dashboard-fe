import { Col, Row } from "react-bootstrap";
import { ParameterGraph } from "../ParameterGraph";

export const Parameter = ({ timestamp }) => {

  const nexttimestamp = new Date(
    new Date(timestamp).getTime() + 60 * 1000
  ).toISOString();

  return (
    <Col xs={12}>
      <Row>
        <Col lg={12}>
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
              <p>
                <strong>Expected Next Data Arrival: </strong>
                {nexttimestamp}
              </p>
            </Col>
          </Row>
        </Col>

        <Col lg={12}>
            <div
              className="shadow-lg rounded border m-1"
            >
              <ParameterGraph/>
            </div>
          </Col>
      </Row>
    </Col>
  );
};
