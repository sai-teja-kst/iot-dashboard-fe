import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import { X } from "react-bootstrap-icons";

const Template = () => {
  const [indexName, setIndexName] = useState("");
  const [fields, setFields] = useState([
    { name: "", type: "text", isObject: false, objectFields: [] },
  ]);
  const [indexType, setIndexType] = useState("logs");
  const [template, setTemplate] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const addField = () => {
    setFields([
      ...fields,
      { name: "", type: "text", isObject: false, objectFields: [] },
    ]);
  };

  const handleFieldNameChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].name = value;
    setFields(newFields);
  };

  const handleFieldTypeChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].type = value;
    setFields(newFields);
  };

  const handleObjectChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].isObject = value;
    setFields(newFields);
  };

  const handleObjectFieldNameChange = (index, objIndex, value) => {
    const newFields = [...fields];
    newFields[index].objectFields[objIndex].name = value;
    setFields(newFields);
  };

  const handleObjectFieldTypeChange = (index, objIndex, value) => {
    const newFields = [...fields];
    newFields[index].objectFields[objIndex].type = value;
    setFields(newFields);
  };

  const addObjectField = (index) => {
    const newFields = [...fields];
    newFields[index].objectFields.push({ name: "", type: "text" });
    setFields(newFields);
  };

  const generateTemplate = () => {
    const fieldMappings = fields.reduce((acc, field) => {
      if (field.isObject) {
        const objectMappings = field.objectFields.reduce((objAcc, objField) => {
          objAcc[objField.name] = { type: objField.type };
          return objAcc;
        }, {});
        acc[field.name] = { properties: objectMappings };
      } else {
        acc[field.name] = { type: field.type };
      }
      return acc;
    }, {});

    const template = {
      index_patterns: indexName + "_*",
      mappings: {
        [indexType]: {
          properties: fieldMappings,
        },
      },
    };

    const templateString =
      "PUT _template/" + indexName + JSON.stringify(template, null, 2);
    setTemplate(templateString);
    setShowOutput(true);
  };

  const onCloseBtn = () => {
    setShowOutput(false);
  };

  const onCopyBtn = () => {
    navigator.clipboard.writeText(template);
  };

  const clearFields = () => {
    setFields([{ name: "", type: "text", isObject: false, objectFields: [] }]);
  };

  return (
    <Container className="border rounded p-2 shadow-lg mt-2">
      <Row>
        <Col>
          <h4 className="mt-2 text-primary">
            Elasticsearch Template Generator
          </h4>
          <Form>
            <Form.Group controlId="indexName" className="mb-3">
              <Form.Label>Index Name:</Form.Label>
              <Form.Control
                type="text"
                value={indexName}
                onChange={(e) => setIndexName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="indexType" className="mb-3">
              <Form.Label>Index Type:</Form.Label>
              <Form.Control
                as="select"
                className="w-25"
                value={indexType}
                onChange={(e) => setIndexType(e.target.value)}
              >
                <option value="logs">logs</option>
                <option value="_doc">_doc</option>
              </Form.Control>
            </Form.Group>
            <Form.Label>Add Required Fields:</Form.Label>
            {fields.map((field, index) => (
              <div key={index}>
                <Row>
                  <Col>
                    <Form.Group
                      controlId={`fieldName${index}`}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={field.name}
                        onChange={(e) =>
                          handleFieldNameChange(index, e.target.value)
                        }
                        placeholder="Field Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId={`fieldType${index}`}
                      className="mb-3"
                    >
                      <Form.Control
                        as="select"
                        value={field.type}
                        onChange={(e) =>
                          handleFieldTypeChange(index, e.target.value)
                        }
                      >
                        <option value="text">Text</option>
                        <option value="keyword">Keyword</option>
                        <option value="integer">Integer</option>
                        <option value="float">Float</option>
                        <option value="datetime">Datetime</option>
                        {/* Add more data types as needed */}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId={`isObject${index}`} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Object"
                        checked={field.isObject}
                        onChange={(e) =>
                          handleObjectChange(index, e.target.checked)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {field.isObject &&
                  field.objectFields.map((objField, objIndex) => (
                    <Row key={objIndex}>
                      <Col>
                        <Form.Group
                          controlId={`objFieldName${index}-${objIndex}`}
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={objField.name}
                            onChange={(e) =>
                              handleObjectFieldNameChange(
                                index,
                                objIndex,
                                e.target.value
                              )
                            }
                            placeholder="Object Field Name"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          controlId={`objFieldType${index}-${objIndex}`}
                          className="mb-3"
                        >
                          <Form.Control
                            as="select"
                            value={objField.type}
                            onChange={(e) =>
                              handleObjectFieldTypeChange(
                                index,
                                objIndex,
                                e.target.value
                              )
                            }
                          >
                            <option value="text">Text</option>
                            <option value="keyword">Keyword</option>
                            <option value="integer">Integer</option>
                            <option value="float">Float</option>
                            <option value="datetime">Datetime</option>
                            {/* Add more data types as needed */}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  ))}
                {field.isObject && (
                  <Button
                    onClick={() => addObjectField(index)}
                    className="me-3 mb-2"
                  >
                    Add Object Field
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={addField} className="me-3">
              Add Field
            </Button>
            <Button onClick={clearFields} className="me-3">
              Clear
            </Button>
            <Button
              onClick={generateTemplate}
              variant="success"
              className="me-3"
            >
              Generate Template
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        {showOutput && (
          <Col className="p-2 shadow-lg">
            <h3 className="text-success mb-3">Output Response</h3>
            <div className="d-flex flex-row justify-content-center mt-2">
              <Clipboard
                className="me-2"
                style={{ cursor: "pointer", color: "cyan" }}
                onClick={onCopyBtn}
              />
              <X
                className="me-2"
                style={{ cursor: "pointer", color: "red", marginLeft: "5px" }}
                onClick={onCloseBtn}
              />
            </div>
            <div className="d-flex justify-content-center mt-2">
              <textarea
                rows={20}
                readOnly
                value={template}
                style={{ padding: "10px", width: "100%" }}
                placeholder="Generated JSON will appear here..."
              />
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Template;
