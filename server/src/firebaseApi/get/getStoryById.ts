import { Request, Response } from "express";
import { firestore } from "../../firebase/firebase";

const getStoryById = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).json({ error: "Story ID is required" });
    return;
  }

  try {
    const storyRef = firestore.collection("stories").doc(id);
    const storySnapshot = await storyRef.get();

    if (!storySnapshot.exists) {
      response.status(404).json({ error: "Story not found" });
      return;
    }

    const storyData = storySnapshot.data();
    response.status(200).json({ data: storyData });
  } catch (error) {
    console.error("Error fetching story:", error);
    response.status(500).json({ error: "An error occurred while fetching the story" });
  }
};

export default getStoryById;
