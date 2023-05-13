import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const { registerUser, verifyToken } = useGlobalContext();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const success = await registerUser(username, email, password, confirmPassword, image);
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
      <Card className="p-4" style={{ borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label column sm="4">
                Username:
              </Form.Label>
                <Form.Control 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="4">
                Email:
              </Form.Label>
                <Form.Control 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="4">
                Password:
              </Form.Label>
                <Form.Control 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="4">
                Confirm Password:
              </Form.Label>
                <Form.Control 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm="4">
                Profile Image:
              </Form.Label>
                <Form.Control 
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
            </Form.Group>
            <Button className="w-100 mt-3" type="button" onClick={handleRegister}>
              Register
            </Button>
            <span style={{fontSize: '0.8em', color: '#999999'}}>Already have an account? <a href="/login">Login</a></span>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterScreen;
