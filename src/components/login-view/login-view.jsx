import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container style={{ paddingTop: '4rem' }}>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">

        <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        <Col>
          <CardGroup>
            <Card body>
              <Card.Title className="text-center">Login to MyFlix to access your movies.</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username." />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password." />
                </Form.Group>
                <Button variant="dark" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};