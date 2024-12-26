import { FieldConfigType } from "@components/forms/fields/Models";
import { LoginEmailPassType } from "@models/UserTypes";

const loginEmailPassFields: FieldConfigType<LoginEmailPassType>[] = [
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
];
export default loginEmailPassFields;
