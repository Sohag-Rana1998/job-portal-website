import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../useAuth/useAuth";

const useMyJobsData = (email) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-jobs"],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/my-job-list?email=${user?.email}`
        );
        return data;
      }
    },
  });
  return { data, isLoading, refetch };
};

export default useMyJobsData;
