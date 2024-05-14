import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAgentsData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['AgentsData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/agents`
      );
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAgentsData;
