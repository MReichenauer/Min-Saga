import { CharacterType } from "../../models/GlobalTypes";

export const createCharacterDescription = (character: CharacterType) => {
  return `character with id: ${character.id} with the name: ${
    character.name
  } is of type: ${character.type.toLowerCase()} and is described as: ${character.description.toLowerCase()}. ${
    character.personality
  }.`;
};
