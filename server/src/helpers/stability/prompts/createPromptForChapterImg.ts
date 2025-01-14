import { ChapterType, CharacterType } from "../../../models/GlobalTypes";
import { createCharacterDescription } from "../createCharacterDescription";

export const createPromptForChapterImg = (chapter: ChapterType, characters: CharacterType[], seed: string) => {
  const characterDescriptions = Array.isArray(chapter.characters)
    ? chapter.characters
        .map((char: CharacterType) => {
          const charInfo = characters.find((c) => c.id === char.id);
          return charInfo ? createCharacterDescription(charInfo) : "";
        })
        .filter(Boolean)
        .join(" ")
    : "";

  const imgPrompt = `Create an illustration of the scene described as: "${chapter.content}" with the 
  following characters: ${characterDescriptions}. The characters appearance must align with the characters 
  from the image with the seed: ${seed}, where the character with id 1 is on the left and the character with id 5 
  is on the right.`;
  return imgPrompt;
};
