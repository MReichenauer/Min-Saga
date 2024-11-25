import { CharacterType } from "../../models/GlobalTypes";

const createCharacterDescription = (character: CharacterType) => {
  return `${
    character.name
  } är en ${character.type.toLowerCase()} som beskrivs som ${character.description.toLowerCase()}. ${
    character.personality
  }.`;
};

export default createCharacterDescription;
