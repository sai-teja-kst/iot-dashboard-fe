import { Card, Col, Row } from "react-bootstrap";

export const Parameter = () => {
  return (
    <Col xs={12}>
      <Row>
        <Col
          xs={12}
          className="border rounded shadow-lg text-light bg-primary bg-gradient p-3 mt-2 bg-opacity-75"
        >
          <p>Environment: Production</p>
          <p>Cloud: Azure</p>
        </Col>
      </Row>
    </Col>
  );
};