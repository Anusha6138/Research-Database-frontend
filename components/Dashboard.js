import React from 'react';
import CountTable from './CountTable';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container className="my-4">
      <h2>Dashboard</h2>
      <CountTable />
    </Container>
  );
};

export default Dashboard;
