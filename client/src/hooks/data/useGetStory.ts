import { getStory } from "@services/serverApi/get/getStory";
import { useQuery } from "@tanstack/react-query";

const useGetStory = (id: string) => {
  return useQuery({
    queryKey: ["story"],
    queryFn: () => getStory(id),
  });
};

export default useGetStory;
