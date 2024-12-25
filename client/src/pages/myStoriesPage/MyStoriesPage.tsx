import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";
import useAuth from "@hooks/auth/useAuth";
import useGetStories from "@hooks/data/useGetStories";
import StoryList from "@components/storyList/StoryList";
import GenericModal from "@components/genericModal/GenericModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReloadPage from "@hooks/helpers/useReloadPage";

const MyStoriesPage = () => {
  const { uid } = useAuth();
  const { data, status, error } = useGetStories(uid);
  const [showNoStoriesModal, setShowNoStoriesModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const reloadPage = useReloadPage();

  useEffect(() => {
    if (status === "error" && error.message === "No stories found") {
      setShowNoStoriesModal(true);
    } else if (status === "error") {
      setShowErrorModal(true);
    }
  }, [status, error]);

  if (status === "pending") {
    return <FadeInOutLoader />;
  }

  return (
    <>
      {status === "success" && data.length > 0 && <StoryList stories={data} />}
      <GenericModal
        closeButton={false}
        displayModal={showNoStoriesModal}
        title="Du har inga sagor änn."
        content={<p>Skapa din första saga för att kunna se dina sagor.</p>}
        successButtonAction={() => navigate("/create-story")}
        successButtonText="Skapa en saga"
        primaryButtonAction={() => navigate(-1)}
        primaryButtonText="Gå tillbaka"
      />
      <GenericModal
        closeButton={false}
        successButtonAction={reloadPage}
        successButtonText="Ladda om sidan"
        primaryButtonAction={() => navigate(-1)}
        primaryButtonText="Gå tillbaka"
        displayModal={showErrorModal}
        title="Ops! Något gick fel."
        content={"Ett oväntat fel uppstod. Ladda om sidan och prova igen."}
      />
    </>
  );
};

export default MyStoriesPage;
