import { ChapterType, CharacterType } from "../../models/GlobalTypes";
import createCharacterDescription from "./createCharacterDescription";

const generateImagePrompt = (chapter: ChapterType, characters: CharacterType[]) => {
  const characterDescriptions = Array.isArray(chapter.characters)
    ? chapter.characters
        .map((char: CharacterType) => {
          const charInfo = characters.find((c) => c.id === char.id);
          return charInfo ? createCharacterDescription(charInfo) : "";
        })
        .filter(Boolean)
        .join(" ")
    : "";

  return `${chapter.imagePrompt} ${characterDescriptions}`;
};

export default generateImagePrompt;
