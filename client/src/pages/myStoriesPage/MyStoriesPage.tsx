import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";
import useAuth from "@hooks/auth/useAuth";
import useGetStories from "@hooks/data/useGetStories";
import StoryList from "@components/storyList/StoryList";

const MyStoriesPage = () => {
  const { uid } = useAuth();
  const { data, status } = useGetStories(uid);

  if (status === "pending") {
    return <FadeInOutLoader />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (data && status === "success") {
    return (
      <div>
        <StoryList stories={data} />
      </div>
    );
  }
};

export default MyStoriesPage;
