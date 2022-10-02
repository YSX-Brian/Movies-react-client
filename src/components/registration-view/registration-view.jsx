import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

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
    } else if (password.length < 8) {
      setPasswordErr('Password must be at least 8 characters long.');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required.');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please use a valid email address.');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://myflix17507.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please log in!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert(response.response.data)
        });
    }
  };

  return (
    <Container style={{ paddingTop: '4rem' }}>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
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
                    minlength="5"
                    placeholder="Enter your username." />
                  {usernameErr && <p>{usernameErr}</p>}
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
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Please enter a valid email." />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)} />
                </Form.Group>

                <Button className="mt-3 mb-3" variant="dark" type="submit" onClick={handleSubmit}>Submit</Button>
              </Form>
              <Link to={'/'}>Already signed up? Log in here.</Link>
            </Card>
          </CardGroup>
        </Col>
        <Col md={2}></Col>
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