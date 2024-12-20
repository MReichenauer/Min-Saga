import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./createStory.module.css";
import InputField from "../fields/inputField/InputField";
import { CreateStoryType, StoryType } from "@models/StoryTypes";
import { useState } from "react";
import { generateStory } from "@services/serverApi/post/generateStory";
import useAuth from "@hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { LoadingEnum } from "@models/LoadingEnum";
import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";
import GenericModal from "@components/genericModal/GenericModal";

const CreateStory = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateStoryType>();

  const [error, setError] = useState<string | null>(null);
  const [displaySuccessModal, setDisplaySuccessModal] = useState<boolean>(false);
  const [displayErrorModal, setDisplayErrorModal] = useState<boolean>(false);
  const [story, setStory] = useState<StoryType | null>(null);
  const [loadingStep, setLoadingStep] = useState<LoadingEnum>(LoadingEnum.NONE);
  const navigate = useNavigate();

  const handleReadStoryNow = () => {
    navigate(`/stories/${story?.id}`);
  };

  const handleViewMyStories = () => {
    navigate("/stories");
  };

  if (!user) {
    return;
  }
  const userUid = user.uid;
  const onSubmit: SubmitHandler<CreateStoryType> = async (data) => {
    setError(null);
    console.log("Sending data:", data);
    try {
      const response = await generateStory(userUid, data, setLoadingStep);
      console.log("Initial response from generateStory:", response);
      setStory(response);
      setDisplaySuccessModal(true);
    } catch (error) {
      console.log("Error generating story:", error);
      setError("Författaren spillde bläck över boken, prova en gång till.");
      setDisplayErrorModal(true);
    } finally {
      reset();
    }
  };

  return (
    <>
      <GenericModal
        displayModal={displaySuccessModal}
        title="Din saga har skapats!"
        content={
          <p>
            Din saga <em>{story?.title}</em> är nu skapad! Du kan finna den under mina sagor.
          </p>
        }
        onClose={() => setDisplaySuccessModal(false)}
        successButtonAction={handleReadStoryNow}
        successButtonText="Jag vill läsa sagan nu"
        primaryButtonAction={handleViewMyStories}
        primaryButtonText="Se alla mina sagor"
      />
      {error && (
        <GenericModal
          displayModal={displayErrorModal}
          title="Något gick fel!"
          content="Författaren spillde bläck över boken, prova en gång till."
          onClose={() => setDisplayErrorModal(false)}
          primaryButtonAction={() => setDisplayErrorModal(false)}
          primaryButtonText="Prova igen"
        />
      )}
      {loadingStep && <FadeInOutLoader loadingState={loadingStep} />}
      <section className={styles.formContainer}>
        <div className={styles.fullForm}>
          <h2>Skapa en egen saga</h2>
          {loadingStep && <p className={styles.loadingText}>{loadingStep}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              htmlFor="mainCharacterName"
              type="text"
              label="Vad ska huvudkaraktären heta ?"
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
              label="Vad ska huvudkaraktären vara ?"
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
              label="Vilken miljö ska sagan utspelas i ?"
              error={errors.environment?.message}
              placeholder="En magisk skog"
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
              label="Barnets ålder ?"
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
              <button className="autumnSuccessButton" type="submit" disabled={isSubmitting}>
                Skapa berättelsen
              </button>
              <button className={styles.resetButton} type="reset" onClick={() => reset()} disabled={isSubmitting}>
                Återställ
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateStory;
