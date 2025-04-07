import React, { useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import "./index.css";
import { FaCopy } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const JsonOps = () => {
  const [jsonData, setJsonData] = useState("");
  const [showMsg, setMsg] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleSubmit = () => {
    try {
      JSON.parse(jsonData);
      setValidationResult("Valid JSON");
      setMsg(true);
    } catch (error) {
      setValidationResult(`Invalid JSON: ${error.message}`);
      setMsg(true);
    }
  };

  const onChangeInput = (e) => {
    setJsonData(e.target.value);
    setMsg(false);
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(jsonData);
      setValidationResult("content copied to clipboard");
      setMsg(true);
    } catch (error) {
      <Alert variant="danger">
        <Alert.Heading>"ERROR TO COPY"</Alert.Heading>
      </Alert>;
    }
  };

  const onPrettier = () => {
    try {
      const prettyJson = JSON.stringify(JSON.parse(jsonData), null, 2);
      setJsonData(prettyJson);
    } catch (error) {
      setValidationResult(`Invalid JSON: ${error.message}`);
      setMsg(true);
    }
  };

  const onStringfy = () => {
    try {
      const escapedString = JSON.stringify(jsonData);
      setJsonData(escapedString);
    } catch (error) {
      setValidationResult(`Invalid JSON: ${error.message}`);
      setMsg(true);
    }
  };

  const onClear = () => {
    try {
      setJsonData("");
      setValidationResult("content cleared successfully");
      setMsg(true);
    } catch (error) {
      setValidationResult(`Invalid JSON: ${error.message}`);
      setMsg(true);
    }
  };

  const renderLineNumberSidebar = () => {
    const lines = jsonData.split("\n").length;
    return (
      <div className="line-number-sidebar rounded">
        {Array.from({ length: lines }, (_, index) => (
          <div key={index + 1}>{index + 1}</div>
        ))}
      </div>
    );
  };

  return (
    <Col xs={12} className="shadow-lg p-2 border rounded mt-2">
      <Row>
        <h4 className="mt-2 text-primary">JSON operations</h4>
        <Col xs={12}>
          <div className="d-flex flex-row">
            {renderLineNumberSidebar()}
            <textarea
              value={jsonData}
              onChange={onChangeInput}
              rows={19}
              placeholder="Enter JSON data here"
              className="form-control json-textarea border-0 shadow-sm"
            />
          </div>
        </Col>
        </Row>
        <Row>
        <Col xs={12} className="justify-content-around">
            <Button onClick={handleSubmit} variant="primary" className="m-2" size="sm">
              Validate
            </Button>
            <Button onClick={onPrettier} variant="primary" className="m-2" size="sm">
              Pretty
            </Button>
            <Button onClick={onStringfy} varient="primary" className="m-2" size="sm">
              Stringfy
            </Button>
            <Button onClick={copyToClipboard} variant="success" className="m-2" size="sm">
              <FaCopy/>
            </Button>
            <Button onClick={onClear} variant="success" className="m-2" size="sm">
              <FaX/>
            </Button>

          <div className="alert-container mt-3">
            {showMsg && (
              <Alert
                variant={
                  validationResult.includes("Invalid") ? "danger" : "success"
                }
              >
                <p>{validationResult}</p>
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default JsonOps;
