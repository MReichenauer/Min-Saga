import QuestionsAndAnswers from "@components/questionsAndAnswers/QuestionsAndAnswers";
import styles from "./helpAndSupportPage.module.css";
import commonQuestions from "@components/questionsAndAnswers/questionsLists/commonQuestions";
import GenericForm from "@components/forms/genericForm/GenericForm";
import sendEmailFields from "@components/forms/genericForm/fields/sendEmailFields";
import sendEmail from "@services/emailJs/sendEmail";
import { SendEmailInput } from "@models/SendEmailTypes";
import useAuth from "@hooks/auth/useAuth";
import { useState } from "react";
import GenericModal from "@components/genericModal/GenericModal";
import useReloadPage from "@hooks/helpers/useReloadPage";
import { useNavigate } from "react-router-dom";

const HelpAndSupportPage = () => {
  const { userEmail } = useAuth();
  const reloadPage = useReloadPage();
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showMessageSuccessModal, setShowMessageSuccessModal] = useState<boolean>(false);

  const handleSendEmail = async (inputData: SendEmailInput) => {
    try {
      await sendEmail(inputData, userEmail);
      setShowMessageSuccessModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setShowErrorModal(true);
      }
    }
  };

  return (
    <>
      <div className="darkPage">
        <div className="pageContainer">
          <div className={styles.contentContainer}>
            <QuestionsAndAnswers title="Vanliga Frågor" questionList={commonQuestions} />
            <div className={styles.emailFormContainer}>
              <GenericForm
                formTitle="Skicka ett meddelande"
                fields={sendEmailFields}
                onSubmit={handleSendEmail}
                submitFormButtonText="Skicka meddelande"
                resetFormButtonText="Rensa formuläret"
              />
            </div>
          </div>
        </div>
      </div>
      <GenericModal
        displayModal={showMessageSuccessModal}
        title="Ditt meddelande är skickat"
        content={`Du kommer få ett svar på din e-post ${userEmail} inom 1-3 dagar.`}
        primaryButtonAction={() => navigate("/")}
        primaryButtonText="Till startsidan"
        onClose={() => setShowMessageSuccessModal(false)}
      />
      <GenericModal
        displayModal={showErrorModal}
        title="Ops! Något gick fel."
        content={"Nu blev det lite tokigt, ett oväntat fel dök upp. Var god ladda om sidan och försök igen."}
        primaryButtonAction={reloadPage}
        primaryButtonText="Ladda om sidan"
        onClose={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default HelpAndSupportPage;
