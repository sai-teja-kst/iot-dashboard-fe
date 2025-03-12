import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import { Landing } from "./Pages/Landing";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import "./index.css";
import { ChatBot } from "./Pages/ChatBot";
import { FaMessage } from "react-icons/fa6";

function App() {
  const [theme, setTheme] = useState("light");
  const [background, setBackground] = useState("bg-light bg-gradient text-dark");

  const onLightTheme = () => {
    setTheme("light");
    setBackground("bg-light bg-gradient text-dark");
  };

  const onDarkTheme = () => {
    setTheme("dark");
    setBackground("bg-dark bg-gradient text-light");
  };

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <Container fluid>
      <Row>
        <Navbar bg="primary" data-bs-theme="dark" className="bg-gradient shadow-lg vw-100 justify-content-between bg-opacity-75">
          <Nav>
            <Navbar.Brand className="p-2">WEST IoT Dashboard</Navbar.Brand>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>
              {theme === "light" ? (
                <Button variant="outline-dark" onClick={onDarkTheme}>
                  <FaSun size={20} />
                </Button>
              ) : (
                <Button variant="outline-light" onClick={onLightTheme}>
                  <FaMoon size={20} />
                </Button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar>
      </Row>

      <Row className={background}>
            <Landing/>
      </Row>

      <Row className="d-none">
      {show ? (<ChatBot/>) : (<Landing/>)}
      </Row>

      <Col className="floating-btn d-none">
        <Button variant="primary m-2 shadow-lg" onClick={toggleShow}>
          Using AI
          <br/>Chat with your data
        </Button>
        <Button
          variant="primary"
          className="rounded-circle p-3"
          onClick={toggleShow}
        >
          <FaMessage size={25} />
        </Button>
      </Col>

    </Container>
  );
}

export default App;
