import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context/globalContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token } = useGlobalContext();
    const history = useNavigate();

    if (!token) {
      history.push('/login');
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
