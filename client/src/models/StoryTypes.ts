export type StoryType = {
  id: string | null;
  targetedAge: number;
  title: string;
  createdAt: string;
  createdBy: string;
  imagePrompt: string;
  chapters: ChapterType[];
  characters: CharacterType[];
};

export type ChapterType = {
  title: string;
  content: string;
  characters: CharacterType[];
  image: string | null | undefined;
  imagePrompt: string;
};

export type CharacterType = {
  id: number;
  name: string;
  type: string;
  description: string;
  personality: string;
};
