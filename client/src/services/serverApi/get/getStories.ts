import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const getStories = async (): Promise<StoryType[]> => {
  const response = await get<ApiResponse<StoryType[]>>(`/firebase/stories`);
  return response.data.data;
};

export { getStories };
