import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, verifyToken } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await loginUser(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token && await verifyToken(token)) {
        navigate('/dashboard');
      }
    };
    checkToken();
  }, [navigate, verifyToken]);  

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '300px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="button" onClick={handleLogin}>
              Login
            </Button>
            <span style={{fontSize: '0.8em', color: '#999999'}}>Don't have an account? <a href="/register">Register here</a></span>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginScreen;
