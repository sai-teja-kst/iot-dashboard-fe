import { useState } from "react";
import {
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  Container,
  Alert,
  Table,
} from "react-bootstrap";

export const ChatCard = () => {
  const [data, setData] = useState([
    { role: "agent", message: "Hello! How can I help you?" },
  ]);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/v1/ai/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: message }),
        }
      );

      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setErr("Internal Server Error. Please try again later...");
      return null;
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setErr("");
    const userMessage = { role: "user", message };
    setData((prevData) => [...prevData, userMessage]);
    setMessage("");

    const agentResponse = await fetchData();

    if (agentResponse && agentResponse.data) {
      const agentMessage = {
        role: "agent",
        message: agentResponse.data,
      };
      setData((prevData) => [...prevData, agentMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderAgentMessage = (msg) => {
    if (Array.isArray(msg.message)) {
      const array = msg.message;

      if (array.length === 0) return <div>No results found.</div>;

      const headers = Object.keys(array[0]).filter(
        (key) => key !== "__v" && key !== "_id"
      );

      return (
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {array.map((row, i) => (
              <tr key={i}>
                {headers.map((header, idx) => (
                  <td key={idx}>{String(row[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return <pre style={{ whiteSpace: "pre-wrap" }}>{String(msg.message)}</pre>;
    }
  };

  return (
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Col xs={12} className="mb-5">
          <div style={{ maxHeight: "65vh", overflowY: "auto", padding: "20px" }}>
            {data.map((msg, index) => (
              <Row
                key={index}
                className={`justify-content-${
                  msg.role === "agent" ? "start" : "end"
                } mb-2`}
              >
                <Col xs="auto">
                  <div
                    className={`p-2 rounded ${
                      msg.role === "agent"
                        ? "bg-secondary text-white"
                        : "bg-primary text-white"
                    }`}
                    style={{ whiteSpace: "pre-wrap", maxWidth: "75vw" }}
                  >
                    {msg.role === "agent" ? renderAgentMessage(msg) : msg.message}
                  </div>
                </Col>
              </Row>
            ))}
          </div>

          {err && <Alert variant="danger">{err}</Alert>}

          <InputGroup className="mt-3">
            <Form.Control
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" type="submit" onClick={sendMessage}>
              Send
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};
