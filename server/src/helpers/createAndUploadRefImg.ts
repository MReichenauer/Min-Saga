import { StoryType } from "../models/GlobalTypes";
import { uploadImgToFirebaseFromMemory } from "./firebase/uploadImgToFirebaseFromMemory";
import { createImgOfCharacterList } from "./stability/createImgOfCharacterList";
import { createPromptForCharListImg } from "./stability/prompts/createPromptForCharListImg";

export const createAndUploadRefImg = async (story: StoryType): Promise<{ imgUrl: string; seed: string }> => {
  try {
    const prompt = createPromptForCharListImg(story);
    console.log("create and upload ref prompt", prompt);
    const { imageBuffer, seed } = await createImgOfCharacterList(prompt);
    const fileName = `images/${Date.now()}_${seed}.webp`;
    const imgUrl = await uploadImgToFirebaseFromMemory(imageBuffer, fileName, "image/webp");
    return { imgUrl, seed };
  } catch (error) {
    console.error("Error in generateAndUploadRefImg:", error);
    throw new Error("An error occurred while generating and uploading the image");
  }
};
