import useAuth from "@hooks/auth/useAuth";

const HomePage = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>HomePage</h1>
      <p>{user?.email}</p>
      <p>{user?.displayName}</p>
      <p>{user?.uid}</p>
      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default HomePage;
