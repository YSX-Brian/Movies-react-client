import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body className="text-center">
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Button onClick={() => { onBackClick(null); }} variant="dark">Back</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
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