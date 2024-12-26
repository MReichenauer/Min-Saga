import { createElement, ReactNode } from "react";
import styles from "./textContainer.module.css";

type TextContainerProps = {
  title?: string;
  typeOfTitle?: "h1" | "h2" | "h3" | "h4";
  text?: string | ReactNode;
  emphasizeText?: string;
};

const TextContainer: React.FC<TextContainerProps> = ({ title, typeOfTitle, text, emphasizeText }) => {
  return (
    <div className={styles.darkLayer}>
      <div className={styles.container}>
        {title && typeOfTitle && <header className={styles.header}>{createElement(typeOfTitle, null, title)}</header>}
        <main>
          {text && <p className={styles.paragraph}>{text}</p>}
          {emphasizeText && <em className={styles.emphasize}> {emphasizeText}</em>}
        </main>
      </div>
    </div>
  );
};

export default TextContainer;
