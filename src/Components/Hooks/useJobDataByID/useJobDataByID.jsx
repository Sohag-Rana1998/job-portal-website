import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useJobDataByID = id => {
  const axiosSecure = useAxiosSecure();
  const {
    data,
    isLoading,
    refetch: reload,
  } = useQuery({
    queryKey: ['job-by-ID', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/job/${id}`);
      return data;
    },
  });
  return { data, isLoading, reload };
};

export default useJobDataByID;
