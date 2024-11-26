import { StoryType } from "../../models/GlobalTypes";

export const saveStoryToFirestore = async (story: StoryType, firestoreInstance: FirebaseFirestore.Firestore) => {
  try {
    const storyRef = firestoreInstance.collection("stories").doc();
    const storyId = storyRef.id;
    story.id = storyId;
    await storyRef.set(story);
  } catch (error) {
    console.error("Error saving story to Firestore:", error);
    throw new Error("Failed to save story to Firestore");
  }
};
