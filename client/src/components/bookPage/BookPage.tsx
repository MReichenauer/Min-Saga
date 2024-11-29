import { ChapterType } from "@models/StoryTypes";
import React from "react";

import styles from "./BookPage.module.css";

type BookPageProps = {
  chapter: ChapterType;
};

const BookPage: React.FC<BookPageProps> = ({ chapter }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftPage}>
        {chapter.image ? <img src={chapter.image} alt="chapter" /> : <h3>Detta kapitel saknar en bild.</h3>}
      </div>
      <section className={styles.rightPage}>
        <h2>{chapter.title}</h2>
        <p>{chapter.content}</p>
      </section>
    </div>
  );
};

export default BookPage;
