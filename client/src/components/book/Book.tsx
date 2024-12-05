import React, { useRef, useState } from "react";
import styles from "./book.module.css";
import FlipPage, { FlipPageRefType } from "react-flip-page";
import { StoryType } from "@models/StoryTypes";
import BookPage from "@components/bookPage/BookPage";
import MobileBookPage from "@components/mobileBookPage/MobileBookPage";
import useCheckScreenWidth from "@hooks/helpers/useCheckScreenWidth";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const { isMobile, width, height } = useCheckScreenWidth();

  console.log("width", width);
  console.log("math", Math.round(width * 0.8));
  const ninetyFivePercentOfWidth = Math.round(width * 0.95);
  const ninetyPercentOfHeight = Math.round(height * 0.9);
  const pageWidth = Math.min(ninetyFivePercentOfWidth, 1200);
  const pageHeight = Math.min(ninetyPercentOfHeight, 600);

  console.log("height", height);
  console.log("pageWidth", pageWidth);

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
      <FlipPage
        onPageChange={(index) => setCurrentPage(index)}
        uncutPages={true}
        ref={flipPageRef}
        showSwipeHint={true}
        responsive={false}
        width={pageWidth}
        height={pageHeight}
        startAt={0}
        className={styles.bookComponent}
        orientation={"horizontal"}
        animationDuration={500}
      >
        {chapters.map((chapter, index) => (
          <div key={index} className={styles.page}>
            {isMobile ? <MobileBookPage chapter={chapter} /> : <BookPage chapter={chapter} />}
          </div>
        ))}
      </FlipPage>

      <div className={styles.actionButtonsContainer}>
        <button
          className={`secondaryButton ${styles.changePageButton}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="var(--almost-white)" viewBox="0 0 32 32" width="24" height="24">
            <path
              d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
              data-name="4-Arrow Left"
            />
          </svg>
        </button>
        <p>
          {currentPage + 1} / {chapters.length}
        </p>
        <button
          className={`secondaryButton ${styles.changePageButton}`}
          onClick={handleNextPage}
          disabled={currentPage === chapters.length - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="var(--almost-white)" viewBox="0 0 32 32" width="24" height="24">
            <path
              d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
              data-name="3-Arrow Right"
            />
          </svg>
        </button>
      </div>
      <p className="mt-2">Bläddra sida genom att dra de åt sidan eller använd knapparna nedan.</p>
    </div>
  );
};

export default Book;
