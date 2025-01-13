import { StoryType } from "../../models/GlobalTypes";
import { formattedCharacterList } from "./formattedCharacterList";

const promptImgOfCharacterList = (story: StoryType) => {
  const characterList = formattedCharacterList(story.charactersEng);

  if (!characterList) {
    throw new Error("Character list was not provided.");
  }

  return `Create an image of all the characters in this list: ${characterList}. 
    They should be standing in a line from left to right, with the character with id 1 on the left side of the image and the character with id 5 on the right. 
    The style of the characters should be appropriate for a children's book. 
    Keep in mind that this image will be used as a reference for creating more images of the characters.`;
};
export { promptImgOfCharacterList };
