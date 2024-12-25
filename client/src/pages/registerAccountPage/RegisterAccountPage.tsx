import styles from "./registerAccountPage.module.css";
import { SubmitHandler } from "react-hook-form";
import { RegisterUserType } from "@models/UserTypes";
import registerAccountFields from "@components/forms/genericForm/fields/registerAccountFields";
import GenericForm from "@components/forms/genericForm/GenericForm";
import useAuth from "@hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GenericModal from "@components/genericModal/GenericModal";
import { useState } from "react";

const RegisterAccountPage = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string>("");

  const onSubmit: SubmitHandler<RegisterUserType> = async (data) => {
    const emailLowerCase = data.email.toLowerCase();
    try {
      await registerWithEmail(emailLowerCase, data.password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setErrorModalMessage("Det finns redan ett konto med den e-postadressen.");
          setShowErrorModal(true);
        }
      } else {
        setShowErrorModal(true);
        setErrorModalMessage("Ett oväntat fel uppstod. Försök igen senare.");
        console.error("Error registering account on submit:", error);
      }
    }
  };

  return (
    <>
      <GenericModal
        onClose={() => setShowErrorModal(false)}
        primaryButtonAction={() => setShowErrorModal(false)}
        primaryButtonText="Förstått"
        displayModal={showErrorModal}
        title="Fel vid registrering"
        content={errorModalMessage}
      />
      <div className={styles.pageContainer}>
        <GenericForm<RegisterUserType>
          fields={registerAccountFields()}
          onSubmit={onSubmit}
          formTitle="Skap nytt konto"
          submitFormButtonText="Skapa konto"
          primaryButtonText="Tillbaka till inloggning"
          primaryButtonAction={() => navigate("/login")}
        />
      </div>
    </>
  );
};

export default RegisterAccountPage;
