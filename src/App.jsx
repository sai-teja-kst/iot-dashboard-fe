import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import { Landing } from "./Pages/Landing";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import "./index.css";

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
        <Landing />
      </Row>
    </Container>
  );
}

export default App;
