type ChapterType = {
  title: string;
  content: string;
  characters: CharacterType[];
  image: string | null | undefined;
  imagePrompt: string;
};

type StoryType = {
  id: string | null;
  targetedAge: number;
  description: string;
  title: string;
  createdAt: string;
  createdBy: string;
  imagePrompt: string;
  chapters: ChapterType[];
  characters: CharacterType[];
};

type CharacterType = {
  id: number;
  name: string;
  type: string;
  description: string;
  personality: string;
};

export { ChapterType, StoryType, CharacterType };
