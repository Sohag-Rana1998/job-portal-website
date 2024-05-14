import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet-async';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);
  return loading ? (
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
  ) : (
    <div className="max-w-5xl animate__animated animate__zoomIn   mx-auto  my-16 bg-white shadow-xl rounded-lg text-gray-900">
      <Helmet>
        <title>RESIDENCE HUB | User Profile</title>
      </Helmet>
      <div className="rounded-t-lg h-32 bg-[#006770] overflow-hidden"></div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={user?.photoURL} />
      </div>
      <div className="w-full pl-2 md:pl-24  md:w-2/4 mx-auto mt-2">
        <h2 className="font-semibold">
          Name:{user?.displayName || 'Not Found'}
        </h2>
        <p className=" font-semibold">Email: {user?.email || 'Not Found'}</p>
      </div>

      <div className="p-4 border-t  mt-2">
        <button className="w-full md:w-72 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
          Add More About You
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
