import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import HomeRoute from './HomeRoute';
import LoginScreen from './Components/User/LoginScreen';
import RegisterScreen from './Components/User/RegisterScreen';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <AppStyled className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<HomeRoute />} />
        </Routes>
      </Router>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: #966fd6;
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(3.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
