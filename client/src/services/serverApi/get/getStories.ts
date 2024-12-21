import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const getStories = async (uid: string): Promise<StoryType[]> => {
  const response = await get<ApiResponse<StoryType[]>>(`/firebase/stories/user/${uid}`);
  return response.data.data;
};

export { getStories };
