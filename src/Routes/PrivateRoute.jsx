import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Components/Hooks/useAuth/useAuth';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
