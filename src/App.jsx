import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Button,
  Tab,
  Badge,
  Collapse,
  NavDropdown,
} from "react-bootstrap";
import { Landing } from "./Pages/Landing";
import {
  FaAngleDown,
  FaAngleUp,
  FaCar,
  FaDatabase,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState } from "react";
import "./index.css";
import { ChatBot } from "./Pages/ChatBot";
import { FaGear, FaMessage, FaScrewdriverWrench } from "react-icons/fa6";
import { Zone } from "./Pages/Zone";
import { Tools } from "./Pages/Tools";

function App() {
  const [theme, setTheme] = useState("light");
  const [subshow, setSubShow] = useState(false);

  const [background, setBackground] = useState(
    "bg-light bg-gradient text-dark"
  );

  const onLightTheme = () => {
    setTheme("light");
    setBackground("bg-light bg-gradient text-dark");
  };

  const onDarkTheme = () => {
    setTheme("dark");
    setBackground("bg-dark bg-gradient text-light");
  };

  return (
    <Container fluid>
      <Row>
        <Navbar
          bg="primary"
          data-bs-theme="dark"
          className="bg-gradient shadow-lg vw-100 justify-content-between"
          style={{ maxHeight: "10vh" }}
        >
          <Nav>
            <Navbar.Brand className="p-2">
              {" "}
              <small>IoT Dashboard</small>
            </Navbar.Brand>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>
              {theme === "light" ? (
                <Button variant="outline-light" onClick={onDarkTheme}>
                  <FaSun size={15} />
                </Button>
              ) : (
                <Button variant="outline-light" onClick={onLightTheme}>
                  <FaMoon size={15} />
                </Button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar>
      </Row>

      <Tab.Container defaultActiveKey="landing">
        <Row className={background}>
          <Col xs={3} lg={1} className="mt-2 d-none d-lg-flex flex-column">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="landing">
                  <FaHome /> <small>Home</small>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="chat">
                  <FaMessage /> <small>Chat</small>{" "}
                  <Badge size="sm" className="bg-dark">
                    Beta
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setSubShow(!subshow)}
                  style={{ cursor: "pointer" }}
                >
                  <FaDatabase /> <small>Zone</small>{" "}
                  {subshow ? <FaAngleUp /> : <FaAngleDown />}
                </Nav.Link>
              </Nav.Item>

              <Collapse in={subshow}>
                <div>
                  <Nav.Item>
                    <Nav.Link eventKey="plant1">
                      <FaGear /> <small>Zone A</small>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="plant2">
                      <FaGear /> <small>Zone B</small>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="plant3">
                      <FaGear /> <small>Zone C</small>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="plant4">
                      <FaGear /> <small>Zone D</small>
                    </Nav.Link>
                  </Nav.Item>
                </div>
              </Collapse>

              <Nav.Item>
                <Nav.Link eventKey="tools">
                  <FaScrewdriverWrench /> <small>Tools</small>
                </Nav.Link>
              </Nav.Item>

            </Nav>
          </Col>

          <Col xs={12} lg={11} className="mt-2 mb-2">
            <Tab.Content>
              <Tab.Pane eventKey="landing">
                <Landing />
              </Tab.Pane>
              <Tab.Pane eventKey="chat">
                <ChatBot />
              </Tab.Pane>
              <Tab.Pane eventKey="plant1">
                <Zone zone="A" />
              </Tab.Pane>
              <Tab.Pane eventKey="plant2">
                <Zone zone="B" />
              </Tab.Pane>
              <Tab.Pane eventKey="plant3">
                <Zone zone="C" />
              </Tab.Pane>
              <Tab.Pane eventKey="plant4">
                <Zone zone="D" />
              </Tab.Pane>
              <Tab.Pane eventKey="tools">
                <Tools />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>

        <div className="d-flex d-lg-none">
          <Nav
            variant="pills"
            className="fixed-bottom bg-dark p-2 justify-content-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="landing">
                <FaHome />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="chat">
                <FaMessage />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="tools">
                <FaScrewdriverWrench />
              </Nav.Link>
            </Nav.Item>

            <NavDropdown title={<FaCar />} id="nav-dropdown">
              <NavDropdown.Item eventKey="plant1">
                <FaGear /> A
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="plant2">
                <FaGear /> B
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="plant3">
                <FaGear /> C
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="plant4">
                <FaGear /> D
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </div>
      </Tab.Container>
    </Container>
  );
}

export default App;
