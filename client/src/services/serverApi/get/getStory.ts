import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const getStory = async (id: string): Promise<StoryType> => {
  try {
    const response = await get<ApiResponse<StoryType>>(`/firebase/stories/${id}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Error in getStory:", error);
    throw new Error("Error in getStory");
  }
};

export { getStory };
