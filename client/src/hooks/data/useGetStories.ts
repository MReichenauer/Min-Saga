import { getStories } from "@services/serverApi/get/getStories";
import { useQuery } from "@tanstack/react-query";

const useGetStories = (uid: string) => {
  return useQuery({
    queryKey: ["allStories"],
    queryFn: () => getStories(uid),
  });
};

export default useGetStories;
