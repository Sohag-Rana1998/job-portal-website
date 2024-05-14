import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
      <div className="w-[80%] mx-auto min-h-screen ">
        <SkeletonTheme baseColor="#a2a2b2">
          <div>
            <div className="mt-10 mb-5">
              <Skeleton height={150} />
            </div>

            <Skeleton height={30} count={10} />
          </div>
        </SkeletonTheme>
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
