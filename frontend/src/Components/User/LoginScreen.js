import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { loginUser, verifyToken } = useGlobalContext();
  const navigate = useNavigate();

  // Simple email validation
  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setError(null);

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      setPassword(''); // Clear password state
      emailRef.current.focus(); // Set focus to email input
      return;
    }

    const success = await loginUser(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setPassword(''); // Clear password state
      passwordRef.current.focus(); // Set focus to password input
      setError('Invalid email or password');
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
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                ref={passwordRef}
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
