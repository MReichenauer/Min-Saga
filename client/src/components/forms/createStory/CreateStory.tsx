import { SubmitHandler } from "react-hook-form";
import { CreateStoryType, StoryType } from "@models/StoryTypes";
import { useState } from "react";
import { generateStory } from "@services/serverApi/post/generateStory";
import useAuth from "@hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { LoadingEnum } from "@models/LoadingEnum";
import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";
import GenericModal from "@components/genericModal/GenericModal";
import GenericForm from "../genericForm/GenericForm";
import createStoryFields from "./createStoryFields";

const CreateStory = () => {
  const { user } = useAuth();

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
      console.error("Error generating story:", error);
      setError("Författaren spillde bläck över boken, prova en gång till.");
      setDisplayErrorModal(true);
    } finally {
      console.log("Finally");
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
      <GenericForm<CreateStoryType>
        fields={createStoryFields}
        onSubmit={onSubmit}
        formTitle="Skapa din saga"
        submitFormButtonText="Skapa saga"
        resetFormButtonText="Återställ"
      />
    </>
  );
};

export default CreateStory;
