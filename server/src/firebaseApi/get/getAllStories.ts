import { Request, Response } from "express";
import { firestore } from "../../firebase/firebase";

const getAllStories = async (request: Request, response: Response) => {
  const { uid } = request.params;
  if (!uid) {
    response.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const storiesRef = firestore.collection("stories").where("createdBy", "==", uid);
    const storiesSnapshot = await storiesRef.get();

    const storiesData = storiesSnapshot.docs.map((doc) => doc.data());
    if (storiesData.length === 0) {
      response.status(404).json({ error: "No stories found" });
      return;
    }

    response.status(200).json({ data: storiesData });
  } catch (error) {
    console.error("Error fetching stories:", error);
    response.status(500).json({ error: "An error occurred while fetching stories" });
  }
};

export default getAllStories;
