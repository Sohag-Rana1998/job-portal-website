import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllJobsData = (currentPage, itemsPerPage, search) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-jobs"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/all-jobs?page=${currentPage}&size=${itemsPerPage}&search=${search}`
      );
      return data;
    },
  });
  return { data, isLoading, refetch };
};

export default useAllJobsData;
