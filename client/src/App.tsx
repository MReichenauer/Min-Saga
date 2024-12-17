import HomePage from "@pages/homepage/HomePage";
import LoginPage from "@pages/loginPage/LoginPage";
import MyStoriesPage from "@pages/myStoriesPage/MyStoriesPage";
import NotFoundPage from "@pages/notFoundPage/NotFoundPage";
import HelpAndSupportPage from "@pages/helpAndSupportPage/HelpAndSupportPage";
import StoryPage from "@pages/storyPage/StoryPage";
import { Route, Routes } from "react-router-dom";
import CreateStoryPage from "@pages/createStoryPage/CreateStoryPage";
import "./App.css";
import VariablesPage from "@pages/variablesPage/VariablesPage";
import ProtectedRoutes from "@components/protectedRoutes/ProtectedRoutes";
import useAuth from "@hooks/auth/useAuth";
import Navigation from "@components/navigation/Navigation";

function App() {
  const { user } = useAuth();
  return (
    <div id="appContainer">
      {user && <Navigation />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/variables" element={<VariablesPage />} />
        {/* Bellow is routes that require a authenticated user to visit */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/stories" element={<CreateStoryPage />} />
          <Route path="/stories/:id" element={<StoryPage />} />
          <Route path="/my-stories" element={<MyStoriesPage />} />
          <Route path="/help-and-support" element={<HelpAndSupportPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
