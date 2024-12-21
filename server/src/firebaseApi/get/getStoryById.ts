import { Request, Response } from "express";
import { firestore } from "../../firebase/firebase";
import { StoryType } from "../../models/GlobalTypes";

const getStoryById = async (request: Request, response: Response) => {
  const { id, uid } = request.params;

  if (!id) {
    response.status(400).json({ error: "Story ID is required" });
    return;
  }

  try {
    const storyRef = firestore.collection("stories").doc(id);
    const storySnapshot = await storyRef.get();
    const storyData = storySnapshot.data() as StoryType;

    if (!storyData) {
      response.status(404).json({ error: "Story not found" });
      return;
    }

    if (storyData.createdBy !== uid) {
      response.status(403).json({ error: "You are not authorized to view this story" });
      return;
    }

    response.status(200).json({ data: storyData });
  } catch (error) {
    console.error("Error fetching story:", error);
    response.status(500).json({ error: "An error occurred while fetching the story" });
  }
};

export default getStoryById;
