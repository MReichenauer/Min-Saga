import useGetStories from "@hooks/data/useGetStories";
import { useNavigate } from "react-router-dom";

const StoriesPage = () => {
  const { data, status } = useGetStories();
  const navigate = useNavigate();
  if (!data) return null;
  console.log("data", data);

  console.log(status);

  data.map((story) => {
    console.log(story);
  });

  return (
    <div>
      <h1>StoriesPage</h1>
      <div>
        {data.map((story) => (
          <div key={story.id}>
            <p onClick={() => navigate(`/stories/${story.id}`)}>{story.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
