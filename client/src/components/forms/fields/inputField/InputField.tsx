import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./inputField.module.css";

type InputFieldProps<T extends FieldValues> = {
  htmlFor: string;
  type: "text" | "number" | "password";
  label: string;
  error?: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  width?: string;
  height?: string;
  required?: boolean;
  requiredMessage?: string;
  min?: number;
  minMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
};

const InputField = <T extends FieldValues>({
  htmlFor,
  type,
  label,
  error,
  placeholder,
  register,
  name,
  width,
  height,
  required,
  requiredMessage,
  min,
  minMessage,
  minLength,
  minLengthMessage,
}: InputFieldProps<T>) => {
  return (
    <div className={styles.inputContainer} style={{ width: width, height: height }}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      <input
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        className={`${styles.inputField} ${error ? styles.errorInput : ""}`}
        {...register(name, {
          required: required ? requiredMessage || "Du måste fylla i detta fält." : false,
          minLength:
            type === "text" && minLength
              ? { value: minLength, message: minLengthMessage || `Måste innehålla minst ${minLength} bokstäver` }
              : undefined,
          min:
            type === "number" && min
              ? { value: min, message: minMessage || `Talet får inte vara mindre änn ${min}` }
              : undefined,
          pattern:
            type === "number"
              ? { value: /^\d+$/, message: "Ogiltigt nummer" }
              : type === "text"
              ? {
                  value: /^(?=[A-Za-zÅÄÖåäö]*[A-Za-zÅÄÖåäö])[A-Za-zÅÄÖåäö]+([A-Za-zÅÄÖåäö\s]+[A-Za-zÅÄÖåäö]+)*$/,

                  message: "Endast bokstäver och mellanslag är tillåtna",
                }
              : undefined,
        })}
      />
      <span className={styles.error}>{error || ""}</span>
    </div>
  );
};

export default InputField;
