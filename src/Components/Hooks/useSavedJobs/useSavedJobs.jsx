import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import useAuth from '../useAuth/useAuth';

const useSavedJobs = filter => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: savedJobs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['saved-jobs', filter],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/saved-jobs-list?email=${user?.email}&filter=${filter}`
        );
        console.log(data);
        return data;
      }
    },
  });
  return { savedJobs, isLoading, refetch };
};

export default useSavedJobs;
