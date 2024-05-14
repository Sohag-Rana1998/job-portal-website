import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useBlogDataByID = id => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['blog-by-ID'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blog/${id}`);
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useBlogDataByID;
