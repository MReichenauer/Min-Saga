import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const getStory = async (id: string): Promise<StoryType> => {
  const response = await get<ApiResponse<StoryType>>(`/firebase/stories/${id}`);
  return response.data.data;
};

export { getStory };
