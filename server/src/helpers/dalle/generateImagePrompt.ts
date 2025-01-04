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
  console.log("imageprompt", chapter.imagePrompt);
  console.log("characterDescription", characterDescriptions);

  return `${chapter.imagePrompt} ${characterDescriptions}`;
};

export default generateImagePrompt;
