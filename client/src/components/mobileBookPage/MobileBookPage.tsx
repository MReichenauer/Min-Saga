import { MobileChapterType } from "@models/StoryTypes";
import React from "react";
import styles from "./mobileBookPage.module.css";

type MobilePageProps = {
  chapter: MobileChapterType;
};

const MobileBookPage: React.FC<MobilePageProps> = ({ chapter }) => {
  if ("image" in chapter) {
    return (
      <div className={styles.pageContainer}>
        {chapter.image ? <img src={chapter.image} alt="chapter" /> : <h3>Detta kapitel saknar en bild.</h3>}
        <p>
          Winston och Bella började leta genom buskarna. De kände på gräset och undersökte varje skugga. Plötsligt kände
          Winston något mjukt och kallt. Det var en gnistrande stav! "Jag har hittat den!" ropade han. Men just då hörde
          de ett högt muller. En mörk skugga svepte över dem. Det var Skuggan, en stor svart katt med vita prickar. "Ni
          kan inte ta den!" morrade Skuggan. Vad skulle de göra nu?
        </p>
      </div>
    );
  }
  if ("content" in chapter) {
    return (
      <div className={styles.pageContainer}>
        <h3>{chapter.title}</h3>
        <p>{chapter.content}</p>
      </div>
    );
  }
};

export default MobileBookPage;
