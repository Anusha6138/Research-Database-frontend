import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert } from "react-bootstrap";

export default function Conference() {
  const [conferences, setConferences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/all_conferences');
        setConferences(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Conference</h2>

      {error && <Alert variant="danger">Failed to load conferences. Please try again later.</Alert>}

      {conferences.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Designation</th>
              <th>Faculty Name</th>
              <th>Citation Link</th>
              <th>Indexing</th>
              <th>DOI</th>
              <th>Month and Year</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conference) => (
              <tr key={conference?._id}>
                <td>{conference?.title_of_paper}</td>
                <td>{conference?.designation}</td>
                <td>{conference?.faculty_name}</td>
                <td>
                {conference?.citation_link}
                </td>
                <td>{conference?.indexing}</td>
                <td>{conference?.doi}</td>
                <td>{conference?.month_and_year}</td>
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
        <Alert variant="info" className="text-center">No conferences available.</Alert>
      )}
    </Container>
  );
}
