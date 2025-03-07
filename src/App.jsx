import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import { Landing } from "./Pages/Landing";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [background, setBackground] = useState("light");

  const onLightTheme = () => {
    setTheme("light");
    setBackground("bg-light text-dark vh-100 vw-100");
  };

  const onDarkTheme = () => {
    setTheme("dark");
    setBackground("bg-dark text-light vh-100 vw-100");
  };

  return (
    <Container fluid>
      <Row>
        <Navbar bg="primary" data-bs-theme="dark" className="justify-content-between">
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
        <Landing />
      </Row>
    </Container>
  );
}

export default App;
