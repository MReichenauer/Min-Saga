import Book from "@components/book/Book";
import useGetStory from "@hooks/data/useGetStory";
import { useParams } from "react-router-dom";
import styles from "./storyPage.module.css";
import RecommendLandscapeBanner from "@components/recommendLandscapeBanner/RecommendLandscapeBanner";

const StoryPage = () => {
  const params = useParams();

  const { data, status } = useGetStory(params.id as string);
  console.log(status);
  console.log(data);
  if (data) {
    return (
      <div className="pageContainer">
        <section className={styles.contentContainer}>
          <h1>{data.title}</h1>
          <RecommendLandscapeBanner />
          <Book story={data} />
        </section>
      </div>
    );
  }
};

export default StoryPage;
