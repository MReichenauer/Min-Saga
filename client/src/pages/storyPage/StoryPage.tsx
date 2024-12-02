import Book from "@components/book/Book";
import useGetStory from "@hooks/data/useGetStory";
import { useParams } from "react-router-dom";
import styles from "./storyPage.module.css";
const StoryPage = () => {
  const params = useParams();

  const { data, status } = useGetStory(params.id as string);
  console.log(status);
  console.log(data);

  if (!data) return null;

  return (
    <div className={styles.pageContainer}>
      <h1>{data.title}</h1>
      <div className={styles.testCont}>
        <div className={styles.test}></div>
        <div className={styles.test1}></div>
        <div className={styles.test2}></div>
        <div className={styles.test3}></div>
        <div className={styles.test4}></div>
        <div className={styles.test5}></div>
        <div className={styles.test6}></div>
        <div className={styles.test7}></div>
        <div className={styles.test8}></div>
        <div className={styles.test9}></div>
        <div className={styles.test10}></div>
        <div className={styles.test11}></div>
      </div>
      <div className={styles.bookContainer}>
        <Book story={data} />
      </div>
    </div>
  );
};

export default StoryPage;
