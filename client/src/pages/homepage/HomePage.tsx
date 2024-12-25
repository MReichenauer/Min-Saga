import useAuth from "@hooks/auth/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  console.log("user", user);

  return (
    <div>
      <h1>
        {" "}
        {user?.displayName} {user?.emailVerified}
      </h1>
    </div>
  );
};

export default HomePage;
