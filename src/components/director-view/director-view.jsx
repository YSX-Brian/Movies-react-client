import React from 'react';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body className="text-center">
                  <Card.Title>{director.Name}</Card.Title>
                  <Card.Text>Born: {director.Birth}</Card.Text>
                  <Card.Text>{director.Bio}</Card.Text>
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



