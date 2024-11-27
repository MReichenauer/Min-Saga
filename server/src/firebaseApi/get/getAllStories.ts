import { Request, Response } from "express";
import { firestore } from "../../firebase/firebase";

const getAllStories = async (request: Request, response: Response) => {
  try {
    const storiesRef = firestore.collection("stories");
    const storiesSnapshot = await storiesRef.get();

    const storiesData = storiesSnapshot.docs.map((doc) => doc.data());

    response.status(200).json({ data: storiesData });
  } catch (error) {
    console.error("Error fetching stories:", error);
    response.status(500).json({ error: "An error occurred while fetching stories" });
  }
};

export default getAllStories;
