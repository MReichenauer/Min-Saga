import useAuth from "@hooks/auth/useAuth";
import styles from "./loginPage.module.css";
const LoginPage = () => {
  const { signInWithGoogle, user, loading } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Min Saga</h1>

      <section className={styles.contentContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <section className={styles.authenticationContainer}>
            <h2>Logga in</h2>
            <div className={styles.buttonContainer}>
              <button className="primaryButton" onClick={signInWithGoogle}>
                Med mitt Google Konto
              </button>
              <button className="secondaryButton" onClick={() => console.log("sign in with email")}>
                Email och lösenord
              </button>
            </div>

            <p>
              Saknar du ett konto? Registrera dig <span className={styles.registerLink}>här</span>
            </p>
          </section>
        )}
      </section>

      {user && (
        <div>
          <p>{user.email}</p>
          <p>{user.uid}</p>
          <p>{user.displayName}</p>
          {user.photoURL && <img src={user.photoURL} alt="user" />}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
