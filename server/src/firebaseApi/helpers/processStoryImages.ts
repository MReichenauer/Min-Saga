import { ChapterType, StoryType } from "../../models/GlobalTypes";
import downloadImage from "./downloadImage";
import uploadImageToFirebase from "./uploadImageToFirebase";

export const processStoryImages = async (story: StoryType, folderName: string) => {
  try {
    await Promise.all(
      story.chapters.map(async (chapter: ChapterType) => {
        if (chapter.image) {
          const tempFilePath = await downloadImage(chapter.image);
          const fileName = `${folderName}/${chapter.title.replace(/\s+/g, "-")}-${Date.now()}.png`;
          const newImageUrl = await uploadImageToFirebase(tempFilePath, fileName);
          chapter.image = newImageUrl;
        }
      })
    );
  } catch (error) {
    console.error("Error processing story images:", error);
    throw new Error("Failed to process story images");
  }
};
