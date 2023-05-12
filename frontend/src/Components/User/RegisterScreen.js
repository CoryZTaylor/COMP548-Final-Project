import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    console.log(image)
    const success = await registerUser(username, email, password, confirmPassword, image);
    // if (success) {
    //   navigate('/dashboard');
    // }
  };  

  const toLogin = () => {
    navigate('/login');
  }

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token && await verifyToken(token)) {
  //       navigate('/dashboard');
  //     }
  //   };
  //   checkToken();
  // }, [navigate, verifyToken]);  

  return (
    <RegisterScreenStyled>
      <form>
      <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Profile Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <button type="button" onClick={toLogin}>
          Back to Login
        </button>
      </form>
    </RegisterScreenStyled>
  );
};

const RegisterScreenStyled = styled.div`
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

export default RegisterScreen;
