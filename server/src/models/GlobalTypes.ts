type ChapterType = {
  title: string;
  content: string;
  image: string | null;
};

type StoryType = {
  title: string;
  coverImage: string | null;
  chapters: ChapterType[];
};

export { ChapterType, StoryType };
