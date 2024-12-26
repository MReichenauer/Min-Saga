import React, { useRef, useState } from "react";
import styles from "./book.module.css";
import FlipPage, { FlipPageRefType } from "react-flip-page";
import { StoryType } from "@models/StoryTypes";
import BookPage from "@components/bookPage/BookPage";
import MobileBookPage from "@components/mobileBookPage/MobileBookPage";
import useCheckScreenSize from "@hooks/helpers/useCheckScreenSize";
import Svg from "@components/svg/svg";
import { IconEnum } from "@components/svg/Models";

type BookProps = {
  story: StoryType;
};

const Book: React.FC<BookProps> = ({ story }) => {
  const { isPortraitMobile, calculatePageHeight, calculatePageWidth } = useCheckScreenSize();
  const [currentPage, setCurrentPage] = useState(0);
  const flipPageRef = useRef<FlipPageRefType | null>(null);
  const chapters = story.chapters.map((chapter) => chapter);

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
    <>
      <div className={styles.bookContainer}>
        {isPortraitMobile ? (
          <FlipPage
            onPageChange={(index) => setCurrentPage(index)}
            uncutPages={true}
            ref={flipPageRef}
            showSwipeHint={true}
            responsive={false}
            width={calculatePageWidth}
            height={calculatePageHeight}
            startAt={0}
            className={styles.bookComponent}
            orientation={"horizontal"}
            animationDuration={500}
            pageBackground="transparent"
          >
            {chapters.map((chapter, index) => (
              <div key={index} className={styles.page}>
                <MobileBookPage chapter={chapter} />
              </div>
            ))}
          </FlipPage>
        ) : (
          <div className={styles.bookComponentContainer}>
            <FlipPage
              onPageChange={(index) => setCurrentPage(index)}
              uncutPages={true}
              ref={flipPageRef}
              showSwipeHint={true}
              responsive={true}
              startAt={0}
              className={styles.bookComponent}
              orientation={"horizontal"}
              animationDuration={500}
              pageBackground="transparent"
            >
              {chapters.map((chapter, index) => (
                <div key={index} className={styles.page}>
                  <BookPage chapter={chapter} />
                </div>
              ))}
            </FlipPage>
          </div>
        )}
      </div>
      <div className={styles.pageNavigationContainer}>
        <div className={styles.pageNavigation}>
          <div className={styles.actionButtonsContainer}>
            <button
              className={`autumnPrimaryButton ${styles.changePageButton}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              <Svg size={24} icon={IconEnum.ARROWLEFT} />
            </button>
            <p>
              {currentPage + 1} / {chapters.length}
            </p>
            <button
              className={`autumnPrimaryButton ${styles.changePageButton}`}
              onClick={handleNextPage}
              disabled={currentPage === chapters.length - 1}
            >
              <Svg size={24} icon={IconEnum.ARROWRIGHT} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
