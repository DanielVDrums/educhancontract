import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Fabric Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/fabricante/registerBatch">
              <Nav.Link>Registrar Lote</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/distribuidor/initiateShipment">
              <Nav.Link>Iniciar Envío</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/distribuidor/updateEvent/:batchID">
              <Nav.Link>Actualizar Evento</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/auditor/validateAuthenticity/:batchID">
              <Nav.Link>Validar Autenticidad</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/consumidor/validateMedication/:medicationID">
              <Nav.Link>Validar Medicamento</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
