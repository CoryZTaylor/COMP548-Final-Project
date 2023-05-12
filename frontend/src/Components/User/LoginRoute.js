// Components/User/LoginRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';

const LoginRoute = () => {
  return (
    <Route
      exact
      path="/login"
      render={() => (
        <LoginScreen />
      )}
    />
  );
};

export default LoginRoute;
