import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useAppliedJobDataByID = id => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['applied-job-by-ID'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/applicationData/${id}`);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAppliedJobDataByID;
