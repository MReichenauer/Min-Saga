import { CreateStoryType, StoryType } from "@models/StoryTypes";
import { post } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const generateStoryGpt = async (request: CreateStoryType): Promise<StoryType> => {
  try {
    const response = await post<ApiResponse<StoryType>, CreateStoryType>("/gpt", request);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in generateStoryGpt:", error);
    throw new Error("Error in generateStoryGpt");
  }
};

export { generateStoryGpt };
