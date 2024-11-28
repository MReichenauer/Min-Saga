import Book from "@components/book/Book";
import useGetStory from "@hooks/data/useGetStory";
import { useParams } from "react-router-dom";

const StoryPage = () => {
  const params = useParams();

  const { data, status } = useGetStory(params.id as string);
  console.log(status);
  console.log(data);

  if (!data) return null;

  return (
    <div>
      StoryPage
      <Book story={data} />
    </div>
  );
};

export default StoryPage;
