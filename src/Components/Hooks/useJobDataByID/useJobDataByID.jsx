import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useJobDataByID = id => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['job-by-ID'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/job/${id}`);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useJobDataByID;
