import { CreateStoryType, StoryType } from "@models/StoryTypes";
import { post } from "../instance";
import { ApiResponse } from "../Models.ts/Types";
import { LoadingEnum } from "@models/LoadingEnum";

const generateStory = async (
  userUid: string,
  story: CreateStoryType,
  setLoadingStep: (step: LoadingEnum) => void
): Promise<StoryType> => {
  try {
    setLoadingStep(LoadingEnum.WRITINGSTORY);
    const gptResponse = await generateStoryGpt(story);
    console.log("gptResponse: ", gptResponse);

    setLoadingStep(LoadingEnum.CREATINGIMAGES);
    const storyWithImages = await generateImagesToStory(gptResponse);
    console.log("dalleResponse: ", storyWithImages);

    setLoadingStep(LoadingEnum.SAVINGSTORY);
    const uploadResponse = await uploadStory(userUid, storyWithImages);
    console.log("uploadResponse: ", uploadResponse);

    if (!uploadResponse.data.story.id) {
      console.error("Id for story is missing", uploadResponse);
      throw new Error("Id for story is missing");
    }
    return uploadResponse.data.story;
  } catch (error) {
    console.error("Error in generateStory:", error);
    throw new Error("Error in generateStory");
  } finally {
    setLoadingStep(LoadingEnum.NONE);
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

const uploadStory = async (userUid: string, story: StoryType): Promise<ApiResponse<{ story: StoryType }>> => {
  try {
    const response = await post<ApiResponse<{ story: StoryType }>, { userUid: string; story: StoryType }>(
      "/firebase/upload-story",
      { userUid, story }
    );

    if (!response.data || !response.data.story) {
      console.error("Invalid response format", response);
      throw new Error("Invalid response format");
    }
    console.log("uploadStory response.data: ", response.data);
    return {
      message: response.message,
      data: {
        story: response.data.story,
      },
    };
  } catch (error) {
    console.error("Error in uploadStory:", error);
    throw new Error("Error in uploadStory");
  }
};

export { generateStoryGpt, generateImagesToStory, generateStory, uploadStory };
