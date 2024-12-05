import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function App() {
  const [query, setQuery] = useState(''); // handles the search input
  const [movies, setMovies] = useState([]);  // holds the list of movies from the API
  const [error, setError] = useState(''); // handles the error messages 

  // Search Action
  const handleSearch = async () => {
    if (query.length < 3) {
      setError('Please input at least 3 characters');
      return;
    }
    setError('');

    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          s: query,
          apikey: '69387213',
        },
      });

      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (error) {
      setError('No movies found.');
    }
  };

  // Clear Function
  const handleClear = () => {
    setQuery('');
    setMovies([]);
    setError('');
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col xs={12} className="d-flex align-items-center">

          {/* Search input */}
          <Form.Group controlId="searchQuery" className="d-flex flex-grow-1 mb-0">
            <Form.Control
              type="text"
              placeholder="Enter Movie Title"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ maxWidth: '1200px', flexGrow: 1 }}
            />
          </Form.Group>

          {/* Search button */}
          <Button
            variant="primary"
            onClick={handleSearch}
            className="mb-0 ms-2"
          >
            Search
          </Button>

          {/* Clear button */}
          <Button
            variant="secondary"
            onClick={handleClear}
            className="mb-0 ms-2"
          >
            Clear
          </Button>
        </Col>
      </Row>

      {/* Error Message */}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Movie Display */}
      <Row className="mt-4">
        {movies.map((movie, index) => (
          <Col lg={6} md={6} sm={12} xs={12} className="mb-4 d-flex justify-content-center" key={index}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                alt={movie.Title}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                  <strong>Year:</strong> {movie.Year}
                  <br />
                  <strong>Type:</strong> {movie.Type}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
