import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h1" gutterBottom>
        Apex Construction Company
      </Typography>
      <Typography variant="h4" gutterBottom>
        Error 404: Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Oops! Looks like you've encountered an error. The page you're looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Go Home
      </Button>
    </Container>
  );
}

export default ErrorPage;

