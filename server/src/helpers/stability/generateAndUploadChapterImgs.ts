import { ChapterType, StoryType } from "../../models/GlobalTypes";
import { uploadImgToFirebaseFromMemory } from "../firebase/uploadImgToFirebaseFromMemory";
import { createImgOfChapter } from "./createImgOfChapter";
import { createPromptForChapterImg } from "./prompts/createPromptForChapterImg";

export const generateAndUploadChapterImgs = async (story: StoryType, seed: string) => {
  const addImagesToChapters = await Promise.all(
    story.chaptersEng.map(async (chapter: ChapterType) => {
      const prompt = createPromptForChapterImg(chapter, story.charactersEng, seed);
      try {
        const { imageBuffer } = await createImgOfChapter(prompt, seed);
        const fileName = `images/${Date.now()}_${seed}.webp`;
        const imageUrl = await uploadImgToFirebaseFromMemory(imageBuffer, fileName, "image/webp");
        return { ...chapter, image: imageUrl };
      } catch (error) {
        console.error(`Error generating an image for ${chapter.title}:`, error);
        return { ...chapter, image: null };
      }
    })
  );

  story.chapters = addImagesToChapters;
  return story;
};
