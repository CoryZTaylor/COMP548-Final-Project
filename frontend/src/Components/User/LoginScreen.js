import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

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

  const toRegister = () => {
    navigate('/register');
  }

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
    <LoginScreenStyled>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={toRegister}>
          Register
        </button>
      </form>
    </LoginScreenStyled>
  );
};

const LoginScreenStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
    }

    input {
      margin-top: 5px;
    }

    button {
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;

export default LoginScreen;