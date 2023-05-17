import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const emailRef = useRef(null);
  const { registerUser, verifyToken } = useGlobalContext();
  const navigate = useNavigate();

  const passwordValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    setError('');

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      setPassword('');
      setConfirmPassword('');
      emailRef.current.focus();
      return;
    }

    if (!passwordValidation.test(password)) {
      setError('Password must be 8 or more characters with at least one capital, lower case, number and special character.');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    const [success, errorMessage] = await registerUser(username, email, password, confirmPassword, image);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(errorMessage);
      setPassword('');
      setConfirmPassword('');
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
            {error && <Alert variant="danger">{error}</Alert>}
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
                ref={emailRef}
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
