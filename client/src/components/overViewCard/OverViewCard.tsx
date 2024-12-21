import React from "react";
import styles from "./overViewCard.module.css";
import { Link } from "react-router-dom";
type OverViewCardProps = {
  title?: string;
  imageUrl?: string;
  description?: string;
  navigateTo?: string;
};

const OverViewCard: React.FC<OverViewCardProps> = ({ title, imageUrl, description, navigateTo }) => {
  const titleId = `card-title-${title?.replace(/\s+/g, "-")}`;
  const descriptionId = `card-description-${description?.replace(/\s+/g, "-")}`;

  return (
    <article className={styles.overViewCard} aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div className={styles.overViewCardImageContainer}>
        {imageUrl ? (
          navigateTo ? (
            <Link to={navigateTo}>
              <img src={imageUrl} className={`${styles.overViewCardImage} ${styles.link}`} alt={`Image for ${title}`} />
            </Link>
          ) : (
            <img src={imageUrl} className={styles.overViewCardImage} alt={`Image for ${title}`} />
          )
        ) : (
          <p>Ingen bild tillgänglig</p>
        )}
      </div>
      <div className={styles.overViewCardContent}>
        <h3 id={titleId}>
          {navigateTo ? (
            <Link to={navigateTo} className={`${styles.overViewCardTitleLink} ${styles.link}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p id={descriptionId}>{description}</p>
      </div>
    </article>
  );
};

export default OverViewCard;
