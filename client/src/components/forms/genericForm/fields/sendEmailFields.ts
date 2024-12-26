import { FieldConfigType } from "@components/forms/fields/Models";
import { SendEmailInput } from "@models/SendEmailTypes";

const sendEmailFields: FieldConfigType<SendEmailInput>[] = [
  {
    type: "text",
    label: "Titel",
    placeholder: "Ange meddelandets titel",
    name: "title",
    width: "100%",
    required: true,
    requiredMessage: "Ange en titel på ditt meddelande",
    minLength: 2,
  },
  {
    type: "textarea",
    label: "Beskrivning",
    placeholder: "Meddelandets beskrivning",
    name: "message",
    width: "100%",
    required: true,
    requiredMessage: "Beskrivningen av meddelandet krävs",
    minLength: 5,
  },
];

export default sendEmailFields;
