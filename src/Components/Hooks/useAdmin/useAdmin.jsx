import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth/useAuth';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['isAdmin'],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/verify-admin?email=${user?.email}`
        );
        return data;
      }
    },
  });

  return { isAdmin, refetch, isLoading };
};

export default useAdmin;
