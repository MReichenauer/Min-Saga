import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./createStory.module.css";
import InputField from "../fields/inputField/InputField";

type CreateStoryType = {
  mainCharacter: string;
  environment: string;
  targetedAge: number;
};

const CreateStory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStoryType>();
  const onSubmit: SubmitHandler<CreateStoryType> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <section className={styles.fullForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          htmlFor="mainCharacter"
          type="text"
          label="Huvudperson"
          error={errors.mainCharacter?.message}
          placeholder="Huvudperson"
          register={register}
          name="mainCharacter"
          width="25%"
        />
        <button type="submit">Skapa</button>
      </form>
    </section>
  );
};

export default CreateStory;
