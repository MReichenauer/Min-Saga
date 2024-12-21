import React from "react";
import styles from "./storyList.module.css";
import { StoryType } from "@models/StoryTypes";

type StoryListProps = {
  stories: StoryType[];
};

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return <div>StoryList</div>;
};

export default StoryList;
