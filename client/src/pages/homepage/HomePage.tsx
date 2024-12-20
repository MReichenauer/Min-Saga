import useAuth from "@hooks/auth/useAuth";

const HomePage = () => {
  const { user, logout } = useAuth();
  return <div></div>;
};

export default HomePage;
