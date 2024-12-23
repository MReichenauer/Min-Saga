import styles from "./registerAccountPage.module.css";
import { SubmitHandler } from "react-hook-form";
import { RegisterUserType } from "@models/UserTypes";
import registerAccountFields from "@components/forms/genericForm/fields/registerAccountFields";
import GenericForm from "@components/forms/genericForm/GenericForm";
import useAuth from "@hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterAccountPage = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterUserType> = async (data) => {
    try {
      await registerWithEmail(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Error registering account:", error);
    }
  };

  return (
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
  );
};

export default RegisterAccountPage;
