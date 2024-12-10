import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const getStory = async (id: string): Promise<StoryType> => {
  try {
    const response = await get<ApiResponse<StoryType>>(`/firebase/stories/${id}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching story:", error);
    throw new Error("An error occurred while fetching the story");
  }
};

export { getStory };
