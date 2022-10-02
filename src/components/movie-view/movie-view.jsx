import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  addFavorite(movie) {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.post(
      `https://myflix17507.herokuapp.com/users/${user}/movies/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("Movie added to favorites.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <CardGroup>
              <Card>
                <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                <Card.Body className="text-center">
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Card.Text className='d-inline'>Genre: </Card.Text>
                  <Link to={`/genre/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                  <br></br>
                  <Card.Text className='d-inline'>Director: </Card.Text>
                  <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                  <br></br>
                  <Button className='mt-3' variant="outline-success" onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
                  <br></br>
                  <Button className='mt-3' onClick={() => { onBackClick(); }} variant="dark">Back</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};