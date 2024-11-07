import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="bg-color">
        <Navbar.Brand href="#home">Hostel-Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto  justify-center">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#">Hostels</Nav.Link>
            <NavDropdown title="Academics" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Library</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Engineering Departments
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Lecture Hall Complex</NavDropdown.Item>
              
            </NavDropdown>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Book Room
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Hostels</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Academics</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;