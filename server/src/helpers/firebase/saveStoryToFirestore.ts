import { StoryType } from "../../models/GlobalTypes";

export const saveStoryToFirestore = async (
  story: StoryType,
  userUid: string,
  firestoreInstance: FirebaseFirestore.Firestore
) => {
  try {
    const storyRef = firestoreInstance.collection("stories").doc();
    const storyId = storyRef.id;
    story.id = storyId;
    story.createdAt = new Date().toISOString();
    story.createdBy = userUid;
    await storyRef.set(story);
  } catch (error) {
    console.error("Error saving story to Firestore:", error);
    throw new Error("Failed to save story to Firestore");
  }
};
