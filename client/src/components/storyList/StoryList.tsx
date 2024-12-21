import React from "react";
import styles from "./storyList.module.css";
import { StoryType } from "@models/StoryTypes";
import OverViewCard from "@components/overViewCard/OverViewCard";

type StoryListProps = {
  stories: StoryType[];
};

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <section aria-label="User stories" className={styles.storiesContainer}>
      <h2>Mina sagor</h2>
      {stories.length < 1 ? (
        <p>Du har inga sagor än</p>
      ) : (
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
      )}
    </section>
  );
};

export default StoryList;
