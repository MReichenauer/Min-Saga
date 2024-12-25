import React, { useState } from "react";
import styles from "./storyList.module.css";
import { StoryType } from "@models/StoryTypes";
import OverViewCard from "@components/overViewCard/OverViewCard";
import GenericModal from "@components/genericModal/GenericModal";
import { Link } from "react-router-dom";

type StoryListProps = {
  stories: StoryType[] | [];
};

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  const [showModal, setShowModal] = useState(false);

  if (stories.length < 1) {
    setShowModal(true);
  }

  return (
    <section aria-label="User stories" className={styles.storiesContainer}>
      {stories.length ? <h2>{`Du har ${stories.length} sagor`}</h2> : <h2>Du har inga sagor</h2>}
      {stories.length ? (
        <ul aria-label="List of users stories" className={styles.storyList}>
          {stories.map((story, index) => (
            <li key={index} className={styles.storyListItem}>
              <OverViewCard
                title={story.title}
                imageUrl={story.chapters[0].image || ""}
                description={story.description}
                navigateTo={`/stories/${story.id}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <GenericModal
          displayModal={showModal}
          title="Du har inga sagor"
          onClose={() => setShowModal(false)}
          content={
            <p>
              Skapa din första saga <Link to={"/create-story"}>här</Link>
            </p>
          }
        />
      )}
    </section>
  );
};

export default StoryList;
