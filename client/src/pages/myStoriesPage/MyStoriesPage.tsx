import FadeInOutLoader from "@components/fadeInOutLoader/FadeInOutLoader";
import useAuth from "@hooks/auth/useAuth";
import useGetStories from "@hooks/data/useGetStories";
import styles from "./myStoriesPage.module.css";

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
        {data.map((story) => (
          <div key={story.id}>{story.title}</div>
        ))}
      </div>
    );
  }
};

export default MyStoriesPage;
