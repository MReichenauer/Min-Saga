import useAuth from "@hooks/auth/useAuth";

const LoginPage = () => {
  const { signInWithGoogle, logout, user, loading } = useAuth();

  return (
    <div>
      <h1>LoginPage</h1>
      {loading && <p>Loading...</p>}
      <button onClick={signInWithGoogle}>Login with google</button>
      <button onClick={logout}>Logout</button>
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
