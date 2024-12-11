import useAuth from "@hooks/auth/useAuth";
import styles from "./loginPage.module.css";
const LoginPage = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
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
              className="autumnSecondaryButton"
              onClick={() => console.log("sign in with email")}
              disabled={loading}
            >
              Email och lösenord
            </button>
          </div>
          <div className={styles.registerContainer}>
            <p>Saknar du ett konto? </p>
            <p>
              {" "}
              Registrera dig{" "}
              <span aria-label="register account link" className={styles.registerLink}>
                här
              </span>
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default LoginPage;
