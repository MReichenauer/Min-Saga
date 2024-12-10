import { ChapterType } from "@models/StoryTypes";
import React from "react";
import styles from "./mobileBookPage.module.css";

type MobilePageProps = {
  chapter: ChapterType;
};

const MobileBookPage: React.FC<MobilePageProps> = ({ chapter }) => {
  if ("Kapitel: 5" in chapter) {
    console.log("slut");
  }

  return (
    <div className={styles.pageContainer}>
      {chapter.image ? <img src={chapter.image} alt="chapter" /> : <h3>Detta kapitel saknar en bild.</h3>}
      <h2>{chapter.title}</h2>
      <p>{chapter.content}</p>
    </div>
  );
};

export default MobileBookPage;
