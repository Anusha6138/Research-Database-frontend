import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Spinner, Card } from 'react-bootstrap';

const fetchData = (url) => {
  return fetch(url).then((response) => response.json());
};

const CountTable = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urls = [
      'http://127.0.0.1:5000/api/book/count',
      'http://127.0.0.1:5000/api/conference/count',
      'http://127.0.0.1:5000/api/journal/count',
    ];

    Promise.all(urls.map((url) => fetchData(url)))
      .then((results) => {
        const data = {
          bookChapter: results[0].message,
          conference: results[1].message,
          journal: results[2].message,
        };
        setCounts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );
  }

  const totalPublications = counts.bookChapter + counts.conference + counts.journal;

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header as="h4" className="text-center bg-dark text-white">
          Academic Year 2023-2024
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th className="text-center">Journal</th>
                <th className="text-center">Conference</th>
                <th className="text-center">Book Chapter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{counts.journal}</td>
                <td className="text-center">{counts.conference}</td>
                <td className="text-center">{counts.bookChapter}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-center font-weight-bold">
                  Total Faculty Publication: {totalPublications}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CountTable;
