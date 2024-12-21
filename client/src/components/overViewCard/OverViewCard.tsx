import React from "react";
import styles from "./overViewCard.module.css";
type OverViewCardProps = {
  title?: string;
  imageUrl?: string;
  description?: string;
};

const OverViewCard: React.FC<OverViewCardProps> = ({ title, imageUrl, description }) => {
  const titleId = `card-title-${title?.replace(/\s+/g, "-")}`;
  const descriptionId = `card-description-${description?.replace(/\s+/g, "-")}`;

  return (
    <article className={styles.overViewCard} aria-labelledby={titleId} aria-describedby={descriptionId}>
      <img src={imageUrl} className={styles.overViewCardImage} alt={`Image for ${title}`} />
      <div className={styles.overViewCardContent}>
        <h2 id={titleId}>{title}</h2>
        <p id={descriptionId}>{description}</p>
      </div>
    </article>
  );
};

export default OverViewCard;
