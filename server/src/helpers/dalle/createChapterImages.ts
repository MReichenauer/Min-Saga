import { ChapterType, StoryType } from "../../models/GlobalTypes";
import imgPrompt from "../../openai/prompts/imgPrompts";
import generateImagePrompt from "./generateImagePrompt";

const createChapterImages = async (story: StoryType) => {
  const addImagesToChapters = await Promise.all(
    story.chapters.map(async (chapter: ChapterType) => {
      const prompt = generateImagePrompt(chapter, story.characters);
      try {
        const image = await imgPrompt(prompt);
        return { ...chapter, image };
      } catch (error) {
        console.error(`Error generating an image for ${chapter.title}:`, error);
        return { ...chapter, image: null };
      }
    })
  );

  story.chapters = addImagesToChapters;
  return story;
};

export default createChapterImages;
