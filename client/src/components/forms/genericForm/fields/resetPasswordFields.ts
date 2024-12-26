import { FieldConfigType } from "@components/forms/fields/Models";
import { ResetPasswordType } from "@models/UserTypes";

const resetPasswordFields = (): FieldConfigType<ResetPasswordType>[] => [
  {
    name: "email",
    label: "E-post",
    type: "email",
    placeholder: "Ange ditt lösenord",
    required: true,
    requiredMessage: "Du måste ange din e-post",
  },
  {
    name: "confirmEmail",
    label: "Beskräfta e-post",
    type: "email",
    placeholder: "Bekräfta din e-post",
    required: true,
    requiredMessage: "Du måste bekräfta din e-post",
    validate: (value: string, context?: ResetPasswordType) =>
      value === context?.email || "E-post adresserna matchar inte",
  },
];

export default resetPasswordFields;
