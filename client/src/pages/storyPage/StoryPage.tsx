import Book from "@components/book/Book";
import useGetStory from "@hooks/data/useGetStory";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./storyPage.module.css";
import RecommendLandscapeBanner from "@components/recommendLandscapeBanner/RecommendLandscapeBanner";
import useAuth from "@hooks/auth/useAuth";
import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";
import GenericModal from "@components/genericModal/GenericModal";

const StoryPage = () => {
  const { uid } = useAuth();
  const params = useParams();
  const { data, status } = useGetStory(params.id as string, uid);
  const navigate = useNavigate();

  if (status === "pending") {
    return <FadeInOutLoader loadingState="Laddar.." />;
  }

  if (status === "error") {
    return (
      <GenericModal
        closeButton={false}
        displayModal={true}
        primaryButtonText="Mina sagor"
        primaryButtonAction={() => navigate("/my-stories")}
        title="Ops! Något gick fel"
        content="Vi kunde inte hitta din saga. Se efter i dina sagor om den verkligen existerar."
      />
    );
  }

  if (data && status === "success") {
    const titleId = `story-title-${data.title.replace(/\s+/g, "-")}`;
    const descriptionId = `story-description-${data.description.replace(/\s+/g, "-")}`;

    return (
      <div>
        <RecommendLandscapeBanner />
        <div className="pageContainer">
          <section aria-labelledby={titleId} aria-describedby={descriptionId} className={styles.contentContainer}>
            <header className={styles.header}>
              <h1 className={styles.title} id={titleId}>
                {data.title}
              </h1>
              <p id={descriptionId} className={styles.description}>
                {data.description}
              </p>
            </header>
          </section>
          <main className={styles.main}>
            <Book story={data} />
          </main>
        </div>
      </div>
    );
  }
};

export default StoryPage;
