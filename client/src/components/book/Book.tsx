import React, { useRef, useState } from "react";
import styles from "./book.module.css";
import FlipPage, { FlipPageRefType } from "react-flip-page";
import { MobileChapterType, StoryType } from "@models/StoryTypes";
import BookPage from "@components/bookPage/BookPage";
import useIsDeviceMobile from "@hooks/helpers/useIsDeviceMobile";
import MobileBookPage from "@components/mobileBookPage/MobileBookPage";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const { isMobile, width } = useIsDeviceMobile();
  console.log("width", width);
  console.log("math", Math.round(width * 0.8));
  const eightyPercentOfWidth = Math.round(width * 0.95);

  const pageWidth = width <= 1300 ? eightyPercentOfWidth : 1200;

  const chapters = story.chapters.map((chapter) => chapter);
  const chapterForMobileView: MobileChapterType[] = chapters.flatMap((chapter) => [
    { title: chapter.title, image: chapter.image },
    { title: chapter.title, content: chapter.content },
  ]);

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

  console.log("chapters", chapters);
  return (
    <div className={styles.bookContainer}>
      <FlipPage
        onPageChange={(index) => setCurrentPage(index)}
        uncutPages={true}
        ref={flipPageRef}
        showSwipeHint={true}
        responsive={false}
        width={pageWidth}
        startAt={0}
        className={styles.bookComponent}
        orientation={"horizontal"}
        animationDuration={500}
      >
        {isMobile
          ? chapterForMobileView.map((chapter, index) => (
              <div key={index} className={styles.page}>
                <MobileBookPage chapter={chapter} />
              </div>
            ))
          : chapters.map((chapter, index) => (
              <div key={index} className={styles.page}>
                <BookPage chapter={chapter} />
              </div>
            ))}
      </FlipPage>

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
