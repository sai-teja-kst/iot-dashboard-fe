import { Col, Row } from "react-bootstrap";
import React from "react";
import { ParameterGraph } from "../ParameterGraph";

export const Parameter = () => {
  return (
    <Col xs={12}>
      <Row>
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
