import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../useAuth/useAuth";

const useAppliedJobsData = (filter) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["applied-jobs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-application-list?email=${user?.email}&filter=${filter}`
      );
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAppliedJobsData;
