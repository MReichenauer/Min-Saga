export type StoryType = {
  id: string | null;
  targetedAge: number;
  title: string;
  description: string;
  createdAt: string | null;
  createdBy: string | null;
  chapters: ChapterType[];
  characters: CharacterType[];
};

export type CreateStoryType = {
  mainCharacterName: string;
  mainCharacterType: string;
  environment: string;
  targetedAge: number;
};

export type ChapterType = {
  title: string;
  content: string;
  characters: ChapterCharacterType[];
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

export type ChapterCharacterType = Pick<CharacterType, "id" | "name">;

export type StoryResponseType = {
  story: StoryType;
};
