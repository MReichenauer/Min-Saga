export type StoryType = {
  id: string | null;
  targetedAge: number;
  title: string;
  description: string;
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

type TitleAndImageType = Pick<ChapterType, "title" | "image">;
type TitleAndContentType = Pick<ChapterType, "title" | "content">;
export type MobileChapterType = TitleAndImageType | TitleAndContentType;

export type CharacterType = {
  id: number;
  name: string;
  type: string;
  description: string;
  personality: string;
};
