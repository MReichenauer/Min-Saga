import { FieldValues, Path } from "react-hook-form";

export type FieldConfigType<T extends FieldValues> = {
  name: Path<T>;
  type: "text" | "number" | "password";
  label: string;
  placeholder: string;
  required?: boolean;
  requiredMessage?: string;
  min?: number;
  minMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  width?: string;
  height?: string;
};
