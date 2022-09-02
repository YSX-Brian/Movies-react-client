import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form, Container, Figure } from 'react-bootstrap';
import "./profile-view.scss";

//display user info
//update user info
//allow a user to deregister
//display a list of the user's favorite movies
//allow a user to remove a favorite movie

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
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
        alert("Movie removed from favorites.");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onLoggedOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

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
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
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

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile updated!");
        window.open(`/users/${Username}`, "_self");
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

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movie } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h3>Profile</h3>
              </Card.Header>
              <Card.Body>
                <p>Name: {Username}</p>
                <p>Email: {Email}</p>
                <p>Birthday: {Birthday}</p>
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
                    <Col key={movies._id} className="fav-movie">
                      <Figure>
                        <Link to={`/movies/${movies._id}`}>
                          <Figure.Image src={movies.ImagePath} alt={movies.Title} />
                          <Figure.Caption>{movies.Title}</Figure.Caption>
                        </Link>
                      </Figure>
                      <Button className="remove" variant="secondary" onClick={() => this.removeFavorite(movies._id)}>
                        Remove from the list
                      </Button>
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
                <Form onSubmit={(e) =>
                  this.editUser(
                    e,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birthday
                  )
                }>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      name='Username'
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                      minLength="5"
                      placeholder="Minimum of 5 characters." />
                  </Form.Group>

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
                      required />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name='date'
                      onChange={(e) => this.setBirthday(e.target.value)} />
                  </Form.Group>

                  <Button variant="dark" type="submit" onClick={() => this.editUser()}>Submit</Button>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h4>Danger Zone!</h4>
                  <Button className="delete-button" variant="danger" onClick={() => this.deleteUser()}>
                    Delete User
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}