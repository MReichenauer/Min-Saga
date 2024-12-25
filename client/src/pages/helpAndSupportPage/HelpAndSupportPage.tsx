import QuestionsAndAnswers from "@components/questionsAndAnswers/QuestionsAndAnswers";
import styles from "./helpAndSupportPage.module.css";

const HelpAndSupportPage = () => {
  return (
    <div className="darkPage">
      <div className="pageContainer">
        <div className={styles.contentContainer}>
          <QuestionsAndAnswers />
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
