import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
export default function BookChapter() {
  const [bookChapters, setBookChapters] = useState([]);
  const [error, setError] = useState(null);
  const {user} = useAuth()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/all_book');
        setBookChapters(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    })();
  }, []);

  if(!user?.isLoggedIn){
       return <Navigate to = "/login"/>
  }

  

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Book Chapters</h2>

      {error && <Alert variant="danger">Failed to load book chapters. Please try again later.</Alert>}

      {bookChapters.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Designation</th>
              <th>Faculty Name</th>
              <th>Citation Link</th>
              <th>DOI</th>
              <th>Month and Year</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookChapters.map((bookChapter) => (
              <tr key={bookChapter?._id}>
                <td>{bookChapter?.title_of_chapter}</td>
                <td>{bookChapter?.designation}</td>
                <td>{bookChapter?.faculty_name}</td>
                <td>
                {bookChapter?.citation_link}
                </td>
                <td>{bookChapter?.doi}</td>
                <td>{bookChapter?.month_and_year}</td>
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
        <Alert variant="info" className="text-center">No book chapters available.</Alert>
      )}
    </Container>
  );
}
