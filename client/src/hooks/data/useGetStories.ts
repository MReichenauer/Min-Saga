import { getStories } from "@services/serverApi/get/getStories";
import { useQuery } from "@tanstack/react-query";

const useGetStories = () => {
  return useQuery({
    queryKey: ["allStories"],
    queryFn: getStories,
  });
};

export default useGetStories;
