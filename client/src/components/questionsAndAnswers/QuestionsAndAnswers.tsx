import { useState } from "react";
import styles from "./questionsAndAnswers.module.css";
import questionsAndAnswersList from "./questionsAndAnswersList";
import { IconEnum } from "@components/svg/Models";
import Svg from "@components/svg/svg";
const QuestionsAndAnswers = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <section className={styles.faqContainer} aria-labelledby="faq-heading">
      <h2 id="faq-heading">Vanliga frågor</h2>
      <ul>
        {questionsAndAnswersList.map((faq, index) => (
          <li key={index} className={`${styles.questionItem} ${openQuestionIndex === index ? styles.active : ""}`}>
            <div className={styles.questionAndToggle}>
              <p className={styles.question}>{faq.question}</p>
              <button
                className={styles.toggleQuestion}
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestionIndex === index}
                aria-controls={`faq-answer-${index}`}
                aria-label={`Toggle answer for: ${faq.question}`}
              >
                <Svg size={24} icon={openQuestionIndex === index ? IconEnum.ARROWUP : IconEnum.ARROWDOWN} />
              </button>
            </div>
            {openQuestionIndex === index && (
              <p
                id={`faq-answer-${index}`}
                className={styles.answer}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuestionsAndAnswers;
