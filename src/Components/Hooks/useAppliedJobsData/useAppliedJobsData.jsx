import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useAppliedJobsData = (email, filter) => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['applied-jobs'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-application-list?email=${email}&filter=${filter}`
      );
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAppliedJobsData;
