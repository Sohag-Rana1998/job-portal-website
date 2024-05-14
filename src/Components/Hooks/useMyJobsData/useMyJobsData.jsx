import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useMyJobsData = email => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['my-jobs'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-job-list?email=${email}`);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useMyJobsData;
