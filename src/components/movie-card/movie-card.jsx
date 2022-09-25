import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './movie-card.scss'

export class MovieCard extends React.Component {

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
    const { movie } = this.props;

    return (
      <Card className='text-center mov-card'>
        <Card.Img variant="top" crossOrigin="anonymous" className="test" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>More Details</Link>
          <br></br>
          <Button className='mt-3' variant="outline-success" onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};