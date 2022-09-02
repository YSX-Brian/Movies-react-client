import React from 'react';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body className="text-center">
                  <Card.Title>{genre.Name}</Card.Title>
                  <Card.Text>{genre.Description}</Card.Text>
                  <Button onClick={() => { onBackClick(); }} variant="dark">Back</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}