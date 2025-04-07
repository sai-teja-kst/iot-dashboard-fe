import { Col, Row } from "react-bootstrap";
import JsonOps from "../../Components/JsonOps";
import FileComparsion from "../../Components/FileComparsion";
import Template from "../../Components/Template";

export const Tools = () => {
  return (
    <Col style={{ minHeight: "91vh" }}>
      <Row className="justify-content-between">
        <Col xs={12} lg={3}>
          <JsonOps />
        </Col>
        <Col xs={12} lg={3}>
          <FileComparsion />
        </Col>
        <Col xs={12} lg={6}>
          <Template />
        </Col>
      </Row>
    </Col>
  );
};
