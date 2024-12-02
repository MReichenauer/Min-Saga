import HomePage from "@pages/homepage/HomePage";
import LoginPage from "@pages/loginPage/LoginPage";
import MyStoriesPage from "@pages/myStoriesPage/MyStoriesPage";
import NotFoundPage from "@pages/notFoundPage/NotFoundPage";
import HelpAndSupportPage from "@pages/helpAndSupportPage/HelpAndSupportPage";
import StoryPage from "@pages/storyPage/StoryPage";
import { Route, Routes } from "react-router-dom";
import StoriesPage from "@pages/storiesPage/StoriesPage";
import "./App.css";
import VariablesPage from "@pages/variablesPage/VariablesPage";

function App() {
  return (
    <div id="appContainer">
      <Routes>
        <Route path="/variables" element={<VariablesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/stories/:id" element={<StoryPage />} />
        <Route path="/my-stories" element={<MyStoriesPage />} />
        <Route path="/help-and-support" element={<HelpAndSupportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
