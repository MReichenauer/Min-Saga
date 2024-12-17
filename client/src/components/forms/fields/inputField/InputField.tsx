import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./inputField.module.css";

type InputFieldProps<T extends FieldValues> = {
  htmlFor: string;
  type: "text" | "number";
  label: string;
  error?: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  width?: string;
  height?: string;
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
        {...register(name)}
      />
      <span className={styles.error}>{error || ""}</span>
    </div>
  );
};

export default InputField;
