import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required.');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long.');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long.');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios.post('https://myflix17507.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          alert('Unable to log in. Check username and password.');
        });
    }
  };

  return (
    <Container style={{ paddingTop: '4rem' }}>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <CardGroup>
            <Card body >
              <Card.Title className="text-center">Login to MyFlix to access your movies.</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username." />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="mt-2">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password." />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button className="mt-3 mb-3" variant="dark" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
              <Link to={'/register'}>No account? Create one here.</Link>
            </Card>
          </CardGroup>
        </Col>
        <Col md={3}></Col>
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