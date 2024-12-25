import { StoryType } from "@models/StoryTypes";
import { get } from "../instance";
import { ApiResponse } from "../Models.ts/Types";
import axios from "axios";

const getStories = async (uid: string): Promise<StoryType[]> => {
  try {
    const response = await get<ApiResponse<StoryType[]>>(`/firebase/stories/user/${uid}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error("No stories found for user with uid:", uid);
        throw new Error("No stories found");
      } else {
        console.error(`Error in getStories: ${error.response?.status} - ${error.response?.statusText}`);
        throw new Error(`Error in getStories: ${error.response?.status} - ${error.response?.statusText}`);
      }
    } else {
      console.error("Unexpected error in getStories:", error);
      throw new Error("Unexpected error in getStories");
    }
  }
};

export { getStories };
