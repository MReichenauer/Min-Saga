import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "./genericForm.module.css";
import InputField from "../fields/inputField/InputField";
import { FieldConfigType } from "../fields/Models";

type GenericFormProps<T extends FieldValues> = {
  fields: FieldConfigType<T>[];
  onSubmit: SubmitHandler<T>;
  formTitle?: string;
  submitFormButtonText?: string;
  resetFormButtonText?: string;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  footer?: React.ReactNode;
};

const GenericForm = <T extends FieldValues>({
  fields,
  onSubmit,
  formTitle,
  submitFormButtonText,
  resetFormButtonText,
  primaryButtonText,
  primaryButtonAction,
  footer,
}: GenericFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<T>();

  type ResponseStatus = {
    status: number;
  };

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      const response = (await onSubmit(data)) as ResponseStatus;
      if (isSubmitSuccessful || response.status === 200) {
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in form submit:", error);
        throw new Error("Error in form submit");
      } else {
        console.error("Unexpected error in form submit:", error);
        throw new Error("Unexpected error in form submit");
      }
    }
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.fullForm}>
        {formTitle && <h2>{formTitle}</h2>}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              htmlFor={field.name}
              type={field.type}
              label={field.label}
              error={(errors[field.name]?.message as string) || ""}
              placeholder={field.placeholder}
              register={register}
              name={field.name}
              required={field.required}
              requiredMessage={field.requiredMessage}
              min={field.min}
              minMessage={field.minMessage}
              minLength={field.minLength}
              minLengthMessage={field.minLengthMessage}
              validate={field.validate ? (value) => field.validate!(value, watch()) : undefined}
              width={field.width}
              height={field.height}
            />
          ))}

          <div className={styles.buttonContainer}>
            {submitFormButtonText && (
              <button className="autumnSuccessButton" type="submit" disabled={isSubmitting}>
                {submitFormButtonText}
              </button>
            )}
            {resetFormButtonText && (
              <button className={styles.resetButton} type="reset" onClick={() => reset()} disabled={isSubmitting}>
                {resetFormButtonText}
              </button>
            )}
            {primaryButtonText && primaryButtonAction && (
              <button
                className="autumnPrimaryButton"
                type="button"
                onClick={primaryButtonAction}
                disabled={isSubmitting}
              >
                {primaryButtonText}
              </button>
            )}
          </div>
        </form>
        {footer && footer}
      </div>
    </section>
  );
};

export default GenericForm;
