import { useLocation, useNavigate } from "react-router-dom";

const useNavigateBack = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateBack = () => {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return navigateBack;
};

export default useNavigateBack;
