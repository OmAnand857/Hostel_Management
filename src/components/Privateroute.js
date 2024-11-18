// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthProviderContext } from './Context';

const PrivateRoute = ({ role }) => {
  const { user, setuser } = useContext(AuthProviderContext);  // useAuth is your custom hook to access user info

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated but doesn't have the required role, redirect them to home page (or any other page)
  if (user.type !== 'admin' ) {
    return <Navigate to="/auth/admin" />;
  }

  // If the user passes the authentication checks, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
