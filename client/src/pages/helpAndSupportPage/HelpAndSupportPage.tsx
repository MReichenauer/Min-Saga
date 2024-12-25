import QuestionsAndAnswers from "@components/questionsAndAnswers/QuestionsAndAnswers";
import styles from "./helpAndSupportPage.module.css";
import commonQuestions from "@components/questionsAndAnswers/questionsLists/commonQuestions";

const HelpAndSupportPage = () => {
  return (
    <div className="darkPage">
      <div className="pageContainer">
        <div className={styles.contentContainer}>
          <QuestionsAndAnswers title="Vanliga Frågor" questionList={commonQuestions} />
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
