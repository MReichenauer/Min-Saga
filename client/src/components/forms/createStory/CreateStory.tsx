import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./createStory.module.css";
import InputField from "../fields/inputField/InputField";
import { CreateStoryType } from "@models/StoryTypes";
import { useState } from "react";
import { generateStory } from "@services/serverApi/post/generateStory";

const CreateStory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateStoryType>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateStoryType> = async (data) => {
    setError(null);
    console.log("Sending data:", data);
    try {
      const response = await generateStory(data);
      console.log("Initial response from generateStory:", response);
    } catch (error) {
      console.log("Error generating story:", error);
      setError("Författaren spillde bläck över boken, prova en gång till.");
    } finally {
      reset();
    }
  };
  return (
    <section className={styles.formContainer}>
      <div className={styles.fullForm}>
        <h2>Skapa en egen berättelse</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            htmlFor="mainCharacterName"
            type="text"
            label="Namn på huvudkaraktär"
            error={errors.mainCharacterName?.message}
            placeholder="Sonja"
            register={register}
            name="mainCharacterName"
            width="100%"
            required={true}
            requiredMessage="Ange karaktärens namn."
            minLength={2}
          />
          <InputField
            htmlFor="mainCharacterType"
            type="text"
            label="Vad ska huvudkaraktären vara?"
            error={errors.mainCharacterType?.message}
            placeholder="Prinsessa"
            register={register}
            name="mainCharacterType"
            width="100%"
            required={true}
            requiredMessage="Ange vad karaktären skall vara."
            minLength={2}
          />
          <InputField
            htmlFor="environment"
            type="text"
            label="Miljön som berättelsen ska utspelas i"
            error={errors.environment?.message}
            placeholder="En skog"
            register={register}
            name="environment"
            width="100%"
            required={true}
            requiredMessage="Du måste ange en miljö."
            minLength={2}
          />
          <InputField
            htmlFor="targetedAge"
            type="number"
            label="Barnets ålder"
            error={errors.targetedAge?.message}
            placeholder="3"
            register={register}
            name="targetedAge"
            width="100%"
            required={true}
            requiredMessage="Du måste ange barnets ålder."
            min={1}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
              Skapa berättelsen
            </button>
            <button className={styles.resetButton} type="reset" onClick={() => reset()} disabled={isSubmitting}>
              Återställ
            </button>
          </div>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>} {/* TODO put in generic modal */}
      </div>
    </section>
  );
};

export default CreateStory;
