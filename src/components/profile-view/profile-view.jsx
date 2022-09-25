import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form, Container, Modal, Figure } from 'react-bootstrap';
import moment from "moment";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      setPassword: null,
      setEmail: null,
      setBirthday: null,
      show: false
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  removeFavorite(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.delete(
      `https://myflix17507.herokuapp.com/users/${username}/movies/${movie}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUser(token) {
    const username = localStorage.getItem("user");
    axios.get(`https://myflix17507.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.put(
      `https://myflix17507.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        Password: this.state.setPassword,
        Email: this.state.setEmail,
        Birthday: this.state.setBirthday,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        const data = response.data;
        console.log(data);
        alert("Profile updated!");
        this.props.history.push(`/users/${Username}`);
        //window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.delete(`https://myflix17507.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted.");
        localStorage.clear();
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setPassword(value) {
    this.setState({
      setPassword: value
    });
  }

  setEmail(value) {
    this.setState({
      setEmail: value
    });
  }

  setBirthday(value) {
    this.setState({
      setBirthday: value
    });
  }

  setShow(value) {
    this.setState({
      show: value
    });
  }

  handleClose = () => this.setShow(false);
  handleShow = () => this.setShow(true);

  render() {
    const { movie } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password,
      setPassword, setEmail, setBirthday, show } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h3>My Profile</h3>
              </Card.Header>
              <Card.Body>
                <p>Name: {Username}</p>
                <p>Email: {Email}</p>
                <p>Birthday: {moment(Birthday).utc().format('MM-DD-YYYY')}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>
            <h3>My Favorite Movies</h3>
          </Card.Header>
          <Card.Body>
            <Row className="justify-content-md-center">
              {/* show favorites, or a message if there are none to display */}
              {FavoriteMovies.length == 0 ? <p>No favorites yet. Add some and they'll be displayed here!</p> :

                FavoriteMovies.map((movieId) => {
                  let movies = movie.find((movie) => movie._id === movieId);

                  return (
                    <Col xs={6} sm={6} md={4} lg={3} key={movies._id}>
                      <Card className='text-center'>
                        <Card.Img variant="top" crossOrigin="anonymous" src={movies.ImagePath} />
                        <Card.Body>
                          <Card.Title>{movies.Title}</Card.Title>
                          <Link to={`/movies/${movies._id}`}>More Details</Link>
                          <br></br>
                          <Button className="mt-2" variant="outline-danger" onClick={() => this.removeFavorite(movies._id)}>
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              }
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h3>Change Account Information</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => this.editUser(e)}>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name='password'
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Minimum of 8 characters." />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name='email'
                      onChange={(e) => this.setEmail(e.target.value)}
                      placeholder="Valid email address only."
                      required />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      required
                      onChange={(e) => this.setBirthday(e.target.value)} />
                  </Form.Group>

                  <Button className="mt-3" variant="dark" type="submit">Submit</Button>
                  <h4 className="mt-5">Danger Zone</h4>
                  <Button className="delete-button" variant="danger" onClick={() => this.handleShow()}>
                    Delete Account
                  </Button>

                  <Modal show={show} onHide={() => this.handleClose()}>
                    <Modal.Header>
                      <Modal.Title>Delete Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure? This process can not be reversed.</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => this.handleClose()}>
                        Go Back
                      </Button>
                      <Button variant="danger" onClick={() => this.deleteUser()}>
                        Delete Account
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}