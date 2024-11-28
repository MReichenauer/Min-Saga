import { StoryType } from "@models/StoryTypes";

import styles from "./book.module.css";
import HTMLFlipBook from "react-pageflip";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const { chapters } = story;
  return (
    <HTMLFlipBook width={1000} height={700} size="stretch">
      <div className={styles.page}>
        <img className={styles.image} src={chapters[0].image} />
      </div>
      <div className={styles.page}>
        <h2>{chapters[0].title}</h2>
        <p>{chapters[0].content} </p>
      </div>
      <div className={styles.page}>
        <img className={styles.image} src={chapters[1].image} />
      </div>
      <div className={styles.page}>
        <h2>{chapters[1].title}</h2>
        <p>{chapters[1].content} </p>
      </div>
      <div className={styles.page}>
        <img className={styles.image} src={chapters[2].image} />
      </div>
      <div className={styles.page}>
        <h2>{chapters[2].title}</h2>
        <p>{chapters[2].content} </p>
      </div>
      <div className={styles.page}>
        <img className={styles.image} src={chapters[3].image} />
      </div>
      <div className={styles.page}>
        <h2>{chapters[3].title}</h2>
        <p>{chapters[3].content} </p>
      </div>
      <div className={styles.page}>
        <img className={styles.image} src={chapters[4].image} />
      </div>
      <div className={styles.page}>
        <h2>{chapters[4].title}</h2>
        <p>{chapters[4].content} </p>
      </div>
    </HTMLFlipBook>
  );
};

export default Book;
