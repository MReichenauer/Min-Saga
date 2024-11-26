import { Request, Response } from "express";
import { StoryType } from "../models/GlobalTypes";
import { firestore } from "../firebase/firebase";
import { processStoryImages } from "./helpers/processStoryImages";
import { saveStoryToFirestore } from "./helpers/saveStoryToFirestore";

const uploadStory = async (request: Request, response: Response) => {
  const story: StoryType = request.body.storyWithImages;
  if (!story) {
    response.status(400).send({ error: "story is required" });
    return;
  }

  try {
    const folderName = `stories/images/${story.title.replace(/\s+/g, "-")}-${Date.now()}`;
    await processStoryImages(story, folderName);
    await saveStoryToFirestore(story, firestore);
    response.status(200).json({ message: "Story uploaded successfully", storyId: story.id });
  } catch (error) {
    console.error("Error uploading story:", error);
    response.status(500).json({ message: "Error uploading story", error });
  }
};

export default uploadStory;
