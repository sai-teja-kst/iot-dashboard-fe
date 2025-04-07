import { useState } from "react";
import { Row, Col, InputGroup, Form, Button, Container } from "react-bootstrap";

export const ChatCard = () => {
  const [data, setData] = useState([
    { role: "agent", message: "Hello! How can I help you?" },
  ]);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/v1/ai/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      setErr("Internal server error. please try again later...")
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setMessage("");
      const userMessage = { role: "user", message: message };
      setData([...data, userMessage]);

      const agentresponse = await fetchData();
      setData([
        ...data,
        userMessage,
        { role: "agent", message: JSON.stringify(agentresponse.data) },
      ]);
    }
  };

  return (
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Col xs={12} className="mb-5">
          <div
            style={{ maxHeight: "65vh", overflowX: "auto", padding: "20px" }}
          >
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
                  >
                    {msg.message}
                  </div>
                </Col>
              </Row>
            ))}
          </div>

          {err && <div>{err}</div>}

          <InputGroup className="mt-3">
            <Form.Control
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={(e)=>((e.key === "Enter") && (setMessage(e.target.value)) && {sendMessage})}
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
