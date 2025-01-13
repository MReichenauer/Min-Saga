import { CharacterType } from "../../models/GlobalTypes";

const formattedCharacterList = (characters: CharacterType[]) => {
  return characters
    .map((character) => `${character.name} (id: ${character.id}, type: ${character.type}) - ${character.description}`)
    .join(", ");
};

export { formattedCharacterList };
