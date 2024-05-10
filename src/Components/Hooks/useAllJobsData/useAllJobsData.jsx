import { useQuery } from '@tanstack/react-query';

const useAllJobsData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-jobs'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/all-jobs`);
      const data = await res.json();
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAllJobsData;
