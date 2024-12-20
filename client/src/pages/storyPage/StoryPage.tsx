import Book from "@components/book/Book";
import useGetStory from "@hooks/data/useGetStory";
import { useParams } from "react-router-dom";
import styles from "./storyPage.module.css";
import RecommendLandscapeBanner from "@components/recommendLandscapeBanner/RecommendLandscapeBanner";

const StoryPage = () => {
  const params = useParams();
  const { data } = useGetStory(params.id as string);

  if (data) {
    return (
      <div className={styles.mainContainer}>
        <div className="pageContainer">
          <section className={styles.contentContainer}>
            <header>
              <h1>{data.title}</h1>
            </header>
            <RecommendLandscapeBanner />
            <Book story={data} />
          </section>
        </div>
      </div>
    );
  }
};

export default StoryPage;
