import React, { useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss'

export function MoviesList(props) {

  const [visibilityFilter, setVisibilityFilter] = useState('');
  const { movies } = props;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    <Row>
      <Col className="text-center">
        <h3 className="mt-4">Welcome to MyFlix!</h3>
        <p>Find and save your favorite movies on MyFlix. Scroll or use the search bar below to discover more.</p>
      </Col>
    </Row>
    <Row>
      <Col className='mb-4'>
        <Form.Control
          onChange={e => setVisibilityFilter(e.target.value)}
          value={visibilityFilter}
          placeholder="Search all MyFlix Movies"
        />
      </Col>
    </Row>
    <Row>
      {filteredMovies.map(m => (
        <Col xs={12} sm={12} md={6} lg={4} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  </>
}
