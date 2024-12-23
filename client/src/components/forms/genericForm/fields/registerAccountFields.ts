import { FieldConfigType } from "@components/forms/fields/Models";
import { RegisterUserType } from "@models/UserTypes";

const registerAccountFields = (): FieldConfigType<RegisterUserType>[] => [
  {
    name: "email",
    label: "E-post",
    type: "email",
    placeholder: "exempel@exempel.com",
    required: true,
    requiredMessage: "Du måste ange din epostadress",
  },
  {
    name: "password",
    label: "Lösenord",
    type: "password",
    placeholder: "Ange ditt lösenord",
    required: true,
    requiredMessage: "Du måste ange ett lösenord",
    minLength: 6,
    minLengthMessage: "Du måste ange minst 6 tecken",
  },
  {
    name: "confirmPassword",
    label: "Beskräfta lösenord",
    type: "password",
    placeholder: "Bekräfta ditt lösenord",
    required: true,
    requiredMessage: "Du måste bekräfta lösenord",
    minLength: 6,
    minLengthMessage: "Du måste ange minst 6 tecken",
    validate: (value: string, context?: RegisterUserType) => value === context?.password || "Lösenorden matchar inte",
  },
];

export default registerAccountFields;
