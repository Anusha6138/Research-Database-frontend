import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import the CSS file

export default function Home({ handleNavigation }) {
  return (
    <Container fluid className="p-0">
      {/* Carousel code here */}

      <Container className="my-5">
        <Row>
          <Col>
            <h2>About Our Platform</h2>
            <p className="paragraph-bold">
              Our research database is designed to facilitate the publication and discovery of academic research papers.
              We provide a platform where researchers can publish their work in journals, conferences, and book chapters.
              Our goal is to create a comprehensive repository of knowledge that is accessible to everyone.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} md={4} className="mb-4">
            <Card className="text-center">
              {/* <Card.Img variant="top" src="https://example.com/journal.jpg" alt="Journal Publications" /> */}
              <Card.Body className="card-body-custom">
                <Card.Title>Journal Publications</Card.Title>
                <Card.Text>
                  Submit your journal articles and reach a global audience.
                </Card.Text>
                <Button variant="primary" onClick={() => handleNavigation('/journalForm')}>Submit Journal</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <Card className="text-center">
              {/* <Card.Img variant="top" src="https://example.com/conference.jpg" alt="Conference Papers" /> */}
              <Card.Body className="card-body-custom">
                <Card.Title>Conference Papers</Card.Title>
                <Card.Text>
                  Present your research at leading conferences around the world.
                </Card.Text>
                <Button variant="primary" onClick={() => handleNavigation('/conferenceForm')}>Submit Conference Paper</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <Card className="text-center">
              {/* <Card.Img variant="top" src="https://example.com/bookchapter.jpg" alt="Book Chapters" /> */}
              <Card.Body className="card-body-custom">
                <Card.Title>Book Chapters</Card.Title>
                <Card.Text>
                  Contribute chapters to scholarly books and expand your research impact.
                </Card.Text>
                <Button variant="primary" onClick={() => handleNavigation('/bookChaptersForm')}>Submit Book Chapter</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
