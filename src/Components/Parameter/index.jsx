import { Col, Row } from "react-bootstrap";
import React from "react";
import { ParameterGraph } from "../ParameterGraph";

export const Parameter = () => {
  const parameterlist = ["temperature", "humidity", "pressure", "co2Gas"];

  console.log(parameterlist);

  return (
    <Col xs={12}>
      <Row>
        <Col xs={12} className="m-1">
          <p>Device : westiotedgedevice</p>
          <p>Cloud : azure</p>
        </Col>
      </Row>

      <Row>
          <Col lg={12}>
            <div
              className="shadow-lg rounded border m-1"
              style={{ minHeight: "50vh", maxHeight: "80vh" }}
            >
              <ParameterGraph/>
            </div>
          </Col>
      </Row>
    </Col>
  );
};
