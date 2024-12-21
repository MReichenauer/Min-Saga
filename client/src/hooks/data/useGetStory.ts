import { getStory } from "@services/serverApi/get/getStory";
import { useQuery } from "@tanstack/react-query";

const useGetStory = (id: string, uid: string) => {
  return useQuery({
    queryKey: ["story"],
    queryFn: () => getStory(id, uid),
  });
};

export default useGetStory;
