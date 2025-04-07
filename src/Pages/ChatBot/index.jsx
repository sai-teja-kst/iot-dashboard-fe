import { Col, Row } from "react-bootstrap";
import { Hello } from "../../Components/Help";
import { ChatCard } from "../../Components/ChatCard";

export const ChatBot = () => {
  return (
    <Col xs={12}>
      <Row style={{height: "91vh"}}>
        <div className="d-flex align-items-start flex-column border rounded mb-5">
          <div className="mb-auto p-2">
            <h1>Chat with your Data using AI</h1>
            <Hello />
          </div>
            <ChatCard />
        </div>
      </Row>
    </Col>
  );
};
