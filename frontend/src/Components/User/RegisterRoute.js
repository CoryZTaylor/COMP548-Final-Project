// Components/User/RegisterRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import RegisterScreen from './RegisterScreen';

const RegisterRoute = () => {
  return (
    <Route
      exact
      path="/register"
      render={() => (
        <RegisterScreen />
      )}
    />
  );
};

export default RegisterRoute;
