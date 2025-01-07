import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users/test_token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.valid) {
          setIsAuthenticated(true);
          setUserRole(response.data.role);
        } else {
          localStorage.removeItem("accountId");
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        localStorage.removeItem("accountId");
        localStorage.removeItem("token");
        window.location.reload();
        console.error('Token validation failed', error);
      }
    };

    checkToken();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default PrivateRoute;