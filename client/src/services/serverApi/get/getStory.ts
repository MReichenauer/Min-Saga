import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";
import axios from "axios";

const getStory = async (id: string, uid: string): Promise<StoryType> => {
  try {
    const response = await get<ApiResponse<StoryType>>(`/firebase/stories/${id}/user/${uid}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.log("Story not found, from getStory");
        throw new Error("Story not found");
      } else {
        console.error(`Error in getStory: ${error.response?.status} - ${error.response?.statusText}`);
        throw new Error(`Error in getStory: ${error.response?.status} - ${error.response?.statusText}`);
      }
    } else {
      console.error("Unexpected error in getStory:", error);
      throw new Error("Unexpected error in getStory");
    }
  }
};

export { getStory };
