import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
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
              <Card.Title className="text-center">Register for MyFlix!</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username." />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minlength="8"
                    placeholder="Password must be at least 8 characters." />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Please enter a valid email." />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="dark" type="submit" onClick={handleSubmit}>Submit</Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.proptypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date)
  })
}