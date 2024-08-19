import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert } from "react-bootstrap";

export default function Journal() {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/all_journals', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setJournals(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Journal</h2>

      {error && <Alert variant="danger">Failed to load journals. Please try again later.</Alert>}

      {journals.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Designation</th>
              <th>Faculty Name</th>
              <th>Citation Link</th>
              <th>Indexing</th>
              <th>DOI</th>
              <th>SJR Quartile</th>
              <th>Month and Year</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr key={journal?._id}>
                <td>{journal?.title_of_paper}</td>
                <td>{journal?.designation}</td>
                <td>{journal?.faculty_name}</td>
                <td>
                {journal?.citation_link}
                </td>
                <td>{journal?.indexing}</td>
                <td>{journal?.doi}</td>
                <td>{journal?.sjr_quartile}</td>
                <td>{journal?.month_and_year}</td>
                <td>
                  <Button variant="primary" size="sm">Edit</Button>
                </td>
                <td>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info" className="text-center">No journals available.</Alert>
      )}
    </Container>
  );
}
