import React, { useRef, useState } from "react";
import styles from "./book.module.css";
import FlipPage, { FlipPageRefType } from "react-flip-page";
import { StoryType } from "@models/StoryTypes";
import BookPage from "@components/bookPage/BookPage";
import useIsDeviceMobile from "@hooks/helpers/useIsDeviceMobile";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const isMobile = useIsDeviceMobile();
  const chapters = story.chapters.map((chapter) => chapter);
  const [currentPage, setCurrentPage] = useState(0);
  console.log(isMobile);
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
      <div className={styles.bookComponent}>
        <FlipPage
          onPageChange={(index) => setCurrentPage(index)}
          uncutPages={true}
          className={styles.book}
          ref={flipPageRef}
          showSwipeHint={true}
          responsive={true}
          startAt={0}
          orientation="horizontal"
          animationDuration={500}
        >
          {chapters.map((chapter, index) => (
            <div key={index} className={styles.page}>
              <BookPage chapter={chapter} />
            </div>
          ))}
        </FlipPage>
      </div>
      <p className="mt-2">Bläddra sida genom att dra de åt sidan eller använd knapparna nedan.</p>
      <div className={styles.actionButtonsContainer}>
        <button className="primaryButton" onClick={handlePreviousPage} disabled={currentPage === 0}>
          Föregående sida
        </button>
        <button className="primaryButton" onClick={handleNextPage} disabled={currentPage === chapters.length - 1}>
          Nästa sida
        </button>
      </div>
    </div>
  );
};

export default Book;
