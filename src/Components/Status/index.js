import { Col, Button } from "react-bootstrap";

export const Status = () => {
  return (
    <Col xs={12}>
      <Col
        lg={6}
        className="border border-primary p-3 mt-3 rounded"
        style={{ height: "40vh" }}
      >
        <h1>Temperature </h1>
        <div>
          <Button className="me-2" variant="primary" size="sm">
            Last 10 mins
          </Button>
          <Button className="me-2" variant="primary" size="sm">
            Last 1 hour
          </Button>
        </div>

      </Col>
    </Col>
  );
};
