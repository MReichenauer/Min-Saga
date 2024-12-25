import useAuth from "@hooks/auth/useAuth";
import styles from "./loginPage.module.css";
import { Link } from "react-router-dom";
import GenericModal from "@components/genericModal/GenericModal";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { signInWithGoogle, loading, user } = useAuth();
  const [confirmEmailModal, setConfirmEmailModal] = useState<boolean>(false);

  useEffect(() => {
    if (user && !user.emailVerified) {
      setConfirmEmailModal(true);
    }
  }, [user]);

  return (
    <>
      <GenericModal
        onClose={() => setConfirmEmailModal(false)}
        primaryButtonAction={() => setConfirmEmailModal(false)}
        primaryButtonText="Förstått"
        displayModal={confirmEmailModal}
        title="Bekräfta ditt konto"
        content={`För att fortsätta behöver du bekräfta ditt konto. Kolla din inkorg för din e-post ${user?.email}.`}
      />

      <div className={styles.container}>
        <h1>Min Saga</h1>

        <section className={styles.contentContainer}>
          <section className={styles.authenticationContainer}>
            <h2>Logga in</h2>
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
                onClick={() => console.log("Sign in with email and password")}
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
          </section>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
