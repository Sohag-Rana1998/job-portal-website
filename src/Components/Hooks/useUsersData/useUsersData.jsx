import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useUsersData = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['aal-users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users`);
      return data;
    },
  });
  return { users, isLoading, refetch };
};

export default useUsersData;
