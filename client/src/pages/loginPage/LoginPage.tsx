import useAuth from "@hooks/auth/useAuth";
import styles from "./loginPage.module.css";
import { Link } from "react-router-dom";
import GenericModal from "@components/genericModal/GenericModal";
import { useEffect, useState } from "react";
import useReloadPage from "@hooks/helpers/useReloadPage";
import GenericForm from "@components/forms/genericForm/GenericForm";
import loginEmailPassFields from "@components/forms/genericForm/fields/loginEmailPassFields";
import { LoginEmailPassType, ResetPasswordType } from "@models/UserTypes";
import useNavigateBack from "@hooks/helpers/useNavigateBack";
import { FirebaseError } from "firebase/app";
import resetPasswordFields from "@components/forms/genericForm/fields/resetPasswordFields";

const LoginPage = () => {
  const { signInWithGoogle, loading, user, logout, signInWithEmail, resetPassword } = useAuth();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [confirmEmailModal, setConfirmEmailModal] = useState<boolean>(false);
  const [showWrongCredentialsModal, setShowWrongCredentialsModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState<boolean>(false);
  const [showResetPasswordSuccessModal, setShowResetPasswordSuccessModal] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const reloadPage = useReloadPage();
  const navigateBack = useNavigateBack();

  useEffect(() => {
    if (user && !user.emailVerified) {
      setConfirmEmailModal(true);
    } else if (user && user.emailVerified) {
      navigateBack();
    }
  }, [user, navigateBack]);

  const handleLoginWithEmailPass = async (data: LoginEmailPassType) => {
    try {
      const email = data.email.toLowerCase();
      await signInWithEmail(email, data.password);
    } catch (error) {
      console.log("fångad", error);
      if (error instanceof FirebaseError && error.code === "auth/invalid-credential") {
        console.log("jag har dig");
        setShowWrongCredentialsModal(true);
        return;
      } else {
        setShowErrorModal(true);
        return;
      }
    }
  };

  const handleLogoutFromModal = async () => {
    await logout();
    setConfirmEmailModal(false);
  };

  const handleCloseResetPasswordModal = () => {
    setShowResetPasswordSuccessModal(false);
    setShowResetPasswordForm(false);
  };
  const handleResetPassword = async (data: ResetPasswordType) => {
    try {
      await resetPassword(data.email);
      setEmailAddress(data.email);
      setShowResetPasswordSuccessModal(true);
    } catch (error) {
      if (error) setShowErrorModal(true);
    }
  };

  return (
    <>
      <GenericModal
        title="Bekräfta ditt konto"
        content={`För att fortsätta behöver du bekräfta ditt konto. Kolla din inkorg för din e-post ${user?.email}. Ladda sedan om sidan.`}
        displayModal={confirmEmailModal}
        closeButton={false}
        onClose={() => setConfirmEmailModal(false)}
        primaryButtonAction={reloadPage}
        primaryButtonText="Ladda om sidan"
        dangerButtonAction={handleLogoutFromModal}
        dangerButtonText="Logga ut"
      />
      <GenericModal
        title="Ops! Nu blev det lite tokigt"
        content={
          <>
            <p>Där finns inte något registrerat konto med denna e-post och lösenords kombination.</p>{" "}
            <p>
              Har du glömt ditt lösenord? <span className={styles.resetPassword}>Återställ lösenord</span>
            </p>
          </>
        }
        displayModal={showWrongCredentialsModal}
        primaryButtonAction={() => setShowWrongCredentialsModal(false)}
        primaryButtonText="Gå tillbaka"
        onClose={() => setShowWrongCredentialsModal(false)}
      />
      <GenericModal
        title="Ops! Något gick fel."
        content={"Ett oväntat fel uppstod. Ladda om sida och prova igen."}
        displayModal={showErrorModal}
        primaryButtonAction={reloadPage}
        primaryButtonText="Ladda om sidan"
        onClose={() => setShowErrorModal(false)}
      />
      <GenericModal
        title="Ditt lösenord är återställt!"
        content={`Du har fått ett meil till ${emailAddress}. Vänligen klicka på länken för att återställa ditt lösenord.`}
        displayModal={showResetPasswordSuccessModal}
        primaryButtonAction={handleCloseResetPasswordModal}
        primaryButtonText="Gå tillbaka"
        onClose={handleCloseResetPasswordModal}
      />

      <div className={styles.container}>
        <h1>Min Saga</h1>
        <section className={styles.contentContainer}>
          {!showSignInForm ? (
            <section className={styles.authenticationContainer}>
              <h2>Logga in</h2>
              <>
                <div className={styles.buttonContainer}>
                  <button
                    aria-label="Sign in with google account"
                    className="autumnPrimaryButton"
                    onClick={signInWithGoogle}
                    disabled={loading}
                  >
                    Med mitt Google Konto
                  </button>
                  <button
                    aria-label="Sign in with email and password"
                    className="autumnPrimaryButton"
                    onClick={() => setShowSignInForm(true)}
                    disabled={loading}
                  >
                    Email och lösenord
                  </button>
                </div>
                <div className={styles.registerContainer}>
                  <p>Saknar du ett konto? </p>
                  <p>
                    <Link to={"/register-account"}>Registrera dig här</Link>
                  </p>
                </div>
              </>
            </section>
          ) : (
            <div className={styles.signInEmailAndPassContainer}>
              {showResetPasswordForm ? (
                <GenericForm
                  onSubmit={handleResetPassword}
                  formTitle="Återställ ditt lösenord"
                  fields={resetPasswordFields()}
                  submitFormButtonText="Återställ ditt lösenord nu"
                  primaryButtonText="Gå tillbaka"
                  primaryButtonAction={() => setShowResetPasswordForm(false)}
                />
              ) : (
                <GenericForm
                  formTitle="Logga in"
                  fields={loginEmailPassFields}
                  onSubmit={handleLoginWithEmailPass}
                  submitFormButtonText="Logga in"
                  primaryButtonText="Gå tillbaka"
                  primaryButtonAction={() => setShowSignInForm(false)}
                  footer={
                    <div className={styles.signInEmailAndPassFooter}>
                      <p>
                        Återställ ditt lösenord{" "}
                        <span onClick={() => setShowResetPasswordForm(true)} className={styles.resetPassword}>
                          här
                        </span>
                      </p>
                    </div>
                  }
                />
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default LoginPage;
