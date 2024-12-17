import CreateStory from "@components/forms/createStory/CreateStory";
import useGetStories from "@hooks/data/useGetStories";

const CreateStoryPage = () => {
  const { data, status } = useGetStories();
  if (!data) return null;
  console.log("data", data);

  console.log(status);

  data.map((story) => {
    console.log(story);
  });

  return (
    <div className="pageContainer">
      <h1>CreateStoryPage</h1>
      <CreateStory />
    </div>
  );
};

export default CreateStoryPage;
