import useAuth from "@hooks/auth/useAuth";
import styles from "./loginPage.module.css";
import { Link } from "react-router-dom";
import GenericModal from "@components/genericModal/GenericModal";
import { useEffect, useState } from "react";
import useReloadPage from "@hooks/helpers/useReloadPage";
import GenericForm from "@components/forms/genericForm/GenericForm";
import loginEmailPassFields from "@components/forms/genericForm/fields/loginEmailPassFields";
import { LoginEmailPassType } from "@models/UserTypes";
import useNavigateBack from "@hooks/helpers/useNavigateBack";

const LoginPage = () => {
  const { signInWithGoogle, loading, user, logout, signInWithEmail } = useAuth();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [confirmEmailModal, setConfirmEmailModal] = useState<boolean>(false);
  const reloadPage = useReloadPage();
  const navigateBack = useNavigateBack();

  // Check if user is logged in and email is not verified. If not verified show modal. If verified redirect user to "/"
  useEffect(() => {
    if (user && !user.emailVerified) {
      setConfirmEmailModal(true);
    } else if (user && user.emailVerified) {
      navigateBack();
    }
  }, [user, navigateBack]);

  const handleLoginWithEmailPass = async (data: LoginEmailPassType) => {
    const email = data.email.toLowerCase();
    await signInWithEmail(email, data.password);
  };

  const handleLogoutWithFromModal = async () => {
    await logout();
    setConfirmEmailModal(false);
  };

  return (
    <>
      <GenericModal
        closeButton={false}
        onClose={() => setConfirmEmailModal(false)}
        primaryButtonAction={reloadPage}
        primaryButtonText="Ladda om sidan"
        dangerButtonAction={handleLogoutWithFromModal}
        dangerButtonText="Logga ut"
        displayModal={confirmEmailModal}
        title="Bekräfta ditt konto"
        content={`För att fortsätta behöver du bekräfta ditt konto. Kolla din inkorg för din e-post ${user?.email}. Ladda sedan om sidan.`}
      />
      {!showSignInForm ? (
        <div className={styles.container}>
          <h1>Min Saga</h1>

          <section className={styles.contentContainer}>
            <section className={styles.authenticationContainer}>
              <h2>Logga in</h2>

              <>
                {" "}
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
          </section>
        </div>
      ) : (
        <>
          <div className={styles.signInEmailAndPassContainer}>
            {" "}
            <h1>Min Saga</h1>
            <GenericForm
              formTitle="Logga in"
              fields={loginEmailPassFields}
              onSubmit={handleLoginWithEmailPass}
              submitFormButtonText="Logga in"
              primaryButtonText="Gå tillbaka"
              primaryButtonAction={() => setShowSignInForm(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
