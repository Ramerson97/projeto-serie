'use client'; // Necessário para hooks

import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';


export default function MyNavbar() {
  const [show, setShow] = useState(false);

  return (
    <Navbar bg="light" expand={false}>
      <Container>
        

        
        <Navbar.Toggle onClick={() => setShow(true)} />
        <Navbar.Offcanvas show={show} onHide={() => setShow(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Navegação</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Link as={Link} href="/top-rated">Melhores Avaliadas</Nav.Link>
              <Nav.Link as={Link} href="/airing-today">Na TV Hoje</Nav.Link>
              <Nav.Link as={Link} href="/on-the-air">Exibidas Hoje</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
