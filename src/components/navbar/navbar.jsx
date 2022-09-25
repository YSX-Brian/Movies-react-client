import React from 'react';
import { Button, Nav, Navbar, Container, Form } from 'react-bootstrap';

export function Menubar({ user }) {

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  }

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container>
        <Navbar.Brand href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="outline-light" onClick={() => onLoggedOut()}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href='/' >Sign-In</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href='/register' >Sign-Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}