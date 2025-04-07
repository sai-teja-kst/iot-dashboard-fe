import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const FileComparsion = () => {
  const [jsonData1, setJsonData1] = useState("");
  const [jsonData2, setJsonData2] = useState("");
  const [highlightedLines, setHighlightedLines] = useState([]);

  const onChangeInput1 = (e) => {
    setJsonData1(e.target.value);
  };

  const onChangeInput2 = (e) => {
    setJsonData2(e.target.value);
  };

  const onClearInputs = () => {
    setJsonData1("");
    setJsonData2("");
    setHighlightedLines([]);
  };

  const onCompare = () => {
    const lines1 = jsonData1.split("\n");
    const lines2 = jsonData2.split("\n");
    const highlighted = [];

    // Compare each line
    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
      if (lines1[i] !== lines2[i]) {
        highlighted.push(i);
      }
    }

    setHighlightedLines(highlighted);
  };

  const renderLineNumberSidebar = (jsonData, highlightedLines) => {
    const lines = jsonData.split("\n");
    return (
      <Col xs={1} className="line-number-sidebar rounded">
        {lines.map((_, index) => (
          <div
            key={index + 1}
            className={highlightedLines.includes(index) ? "bg-danger" : ""}
          >
            {index + 1}
          </div>
        ))}
      </Col>
    );
  };

  return (
    <Container fluid className="shadow-lg p-2 border rounded mt-2">
      <Row className="d-flex flex-row">
        <h4 className="mt-2 text-primary">File Comparsion</h4>
        <Col lg={6}>
          <div className="d-flex flex-row">
            {renderLineNumberSidebar(jsonData1, highlightedLines)}
            <Form.Control
              as="textarea"
              value={jsonData1}
              onChange={onChangeInput1}
              rows={19}
              placeholder="Enter File 1 Content"
              className="json-textarea border-0 shadow-lg"
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="d-flex flex-row">
            {renderLineNumberSidebar(jsonData2, highlightedLines)}
            <Form.Control
              as="textarea"
              value={jsonData2}
              onChange={onChangeInput2}
              rows={19}
              placeholder="Enter File 2 Content"
              className="json-textarea border-0 shadow-lg"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="justify-content-around mt-2">
          <Button variant="primary" onClick={onCompare} className="m-2" size="sm">
            Compare
          </Button>
          <Button variant="secondary" onClick={onClearInputs} size="sm">
            Clear
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FileComparsion;
