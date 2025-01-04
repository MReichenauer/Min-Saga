import { CharacterType } from "../../models/GlobalTypes";

const createCharacterDescription = (character: CharacterType) => {
  return `${
    character.name
  } is a ${character.type.toLowerCase()}, described as ${character.description.toLowerCase()}. ${
    character.personality
  }.`;
};

export default createCharacterDescription;
