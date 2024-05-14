import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useJobsData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['jobsData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-jobs`
      );
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useJobsData;
