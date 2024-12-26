import { FieldValues, Path } from "react-hook-form";

export type FieldConfigType<T extends FieldValues> = {
  name: Path<T>;
  type: "text" | "number" | "password" | "email" | "textarea";
  label: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  min?: number;
  minMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  validate?: (value: string, context?: T | undefined) => true | string;
  width?: string;
  height?: string;
};
