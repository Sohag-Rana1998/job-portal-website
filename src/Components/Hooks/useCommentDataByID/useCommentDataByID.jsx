import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useCommentDataByID = id => {
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['comment-by-ID'],
    queryFn: async () => {
      if (id) {
        const { data } = await axiosSecure.get(`/all-comments?Id=${id}`);
        return data;
      }
    },
  });
  const commentsData = data;
  const refetch1 = refetch;
  return { commentsData, isLoading, refetch1 };
};

export default useCommentDataByID;
