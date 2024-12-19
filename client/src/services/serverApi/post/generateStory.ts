import { CreateStoryType, StoryType } from "@models/StoryTypes";
import { post } from "../instance";
import { ApiResponse } from "../Models.ts/Types";

const generateStory = async (request: CreateStoryType): Promise<StoryType> => {
  try {
    const gptResponse = await generateStoryGpt(request);
    console.log("gptResponse: ", gptResponse);
    const dalleResponse = await generateImagesToStory(gptResponse);
    console.log("dalleResponse: ", dalleResponse);
    return dalleResponse;
  } catch (error) {
    console.error("Error in generateStory:", error);
    throw new Error("Error in generateStory");
  }
};

const generateStoryGpt = async (request: CreateStoryType): Promise<StoryType> => {
  try {
    const response = await post<ApiResponse<StoryType>, CreateStoryType>("/gpt", request);
    console.log("generateStoryGpt response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in generateStoryGpt:", error);
    throw new Error("Error in generateStoryGpt");
  }
};

const generateImagesToStory = async (request: StoryType): Promise<StoryType> => {
  try {
    const response = await post<ApiResponse<StoryType>, { story: StoryType }>("/dalle", { story: request });
    console.log("generateImagesToStory response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in generateImagesToStory:", error);
    throw new Error("Error in generateImagesToStory");
  }
};

export { generateStoryGpt, generateImagesToStory, generateStory };
