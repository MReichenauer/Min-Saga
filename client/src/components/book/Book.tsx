import React, { useRef } from "react";
import styles from "./Book.module.css";
import FlipPage, { FlipPageRefType } from "react-flip-page";
import { StoryType } from "@models/StoryTypes";
import BookPage from "@components/bookPage/BookPage";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const chapters = story.chapters.map((chapter) => chapter);

  const flipPageRef = useRef<FlipPageRefType | null>(null);
  const handleNextPage = () => {
    if (flipPageRef.current) {
      flipPageRef.current.gotoNextPage();
    }
  };
  const handlePreviousPage = () => {
    if (flipPageRef.current) {
      flipPageRef.current.gotoPreviousPage();
    }
  };
  return (
    <div className={styles.bookContainer}>
      <FlipPage
        uncutPages={true}
        className={styles.book}
        ref={flipPageRef}
        showSwipeHint={true}
        startAt={0}
        orientation="horizontal"
        height={500}
        width={1000}
      >
        {chapters.map((chapter, index) => (
          <div key={index} className={styles.page}>
            <BookPage chapter={chapter} />
          </div>
        ))}
      </FlipPage>
      <div className={styles.actionButtonsContainer}>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Book;
