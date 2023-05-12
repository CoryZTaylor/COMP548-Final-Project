import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './context/globalContext';
import DashboardWrapper from './Components/Dashboard/DashboardWrapper';

const HomeRoute = () => {
  const global = useGlobalContext();

  if (!global.token) {
    console.log(global.token)
    return <Navigate to="/login" />;
  }

  return <DashboardWrapper />;
};

export default HomeRoute;
