import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Welcome to Product Manager</h1>
          <Card>
            <Card.Body>
              <Card.Title>About Our Product Management System</Card.Title>
              <Card.Text>
                This is a full-stack MERN application for managing products. 
                You can create, read, update, and delete products with ease.
              </Card.Text>
              <Card.Text>
                Navigate to the Products page to start managing your inventory!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home; 