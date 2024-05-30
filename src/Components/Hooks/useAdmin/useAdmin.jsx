import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth/useAuth';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(`/admin/${user?.email}`);
        return data;
      }
    },
  });

  return { isAdmin, refetch, isLoading };
};

export default useAdmin;
