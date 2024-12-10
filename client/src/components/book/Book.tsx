import React, { useRef, useState } from "react";
import styles from "./book.module.css";
import FlipPage, { FlipPageRefType } from "react-flip-page";
import { StoryType } from "@models/StoryTypes";
import BookPage from "@components/bookPage/BookPage";
import MobileBookPage from "@components/mobileBookPage/MobileBookPage";
import useCheckScreenWidth from "@hooks/helpers/useCheckScreenWidth";
import Svg from "@components/svg/svg";
import { IconEnum } from "@components/svg/Models";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const { isMobile, width, height } = useCheckScreenWidth();

  console.log("width", width);
  console.log("math", Math.round(width * 0.8));
  const ninetyFivePercentOfWidth = Math.round(width * 0.95);
  const ninetyPercentOfHeight = Math.round(height * 0.9);
  const pageWidth = Math.min(ninetyFivePercentOfWidth, 1040);
  const pageHeight = Math.min(ninetyPercentOfHeight, 520);

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
          <Svg size={24} icon={IconEnum.ARROWLEFT} />
        </button>
        <p>
          {currentPage + 1} / {chapters.length}
        </p>
        <button
          className={`secondaryButton ${styles.changePageButton}`}
          onClick={handleNextPage}
          disabled={currentPage === chapters.length - 1}
        >
          <Svg size={24} icon={IconEnum.ARROWRIGHT} />
        </button>
      </div>
      <p className="mt-2">Bläddra sida genom att dra de åt sidan eller använd knapparna nedan.</p>
    </div>
  );
};

export default Book;
