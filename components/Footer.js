import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function Footer() {
  return (
    <Navbar bg="dark" variant="dark" className="mt-auto py-3 footer">
      <Container>
        <Navbar.Text className="text-center mx-auto">
          © 2024 Research Database. All Rights Reserved.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
