import { CreateStoryType } from "@models/StoryTypes";
import { FieldConfigType } from "../fields/Models";

const createStoryFields: FieldConfigType<CreateStoryType>[] = [
  {
    type: "text",
    label: "Vad ska huvudkaraktären heta ?",
    placeholder: "Sonja",
    name: "mainCharacterName",
    width: "100%",
    required: true,
    requiredMessage: "Ange karaktärens namn.",
    minLength: 2,
  },
  {
    type: "text",
    label: "Vad ska huvudkaraktären vara ?",
    placeholder: "Prinsessa",
    name: "mainCharacterType",
    width: "100%",
    required: true,
    requiredMessage: "Ange vad karaktären skall vara.",
    minLength: 2,
  },
  {
    type: "text",
    label: "Vilken miljö ska sagan utspelas i ?",
    placeholder: "En magisk skog",
    name: "environment",
    width: "100%",
    required: true,
    requiredMessage: "Du måste ange en miljö.",
    minLength: 2,
  },
  {
    type: "number",
    label: "Barnets ålder ?",
    placeholder: "3",
    name: "targetedAge",
    width: "100%",
    required: true,
    requiredMessage: "Du måste ange barnets ålder.",
    min: 1,
  },
];

export default createStoryFields;
