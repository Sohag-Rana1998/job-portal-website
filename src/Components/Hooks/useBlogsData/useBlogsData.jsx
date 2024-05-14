import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBlogsData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['BlogsData'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useBlogsData;
