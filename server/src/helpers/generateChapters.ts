import { ChapterType } from "../models/GlobalTypes";

const generateChapters = (storyText: string) => {
  const chapterRegex = /###?\s*Kapitel (\d+):\s*(.*?)\n([\s\S]*?)(?=\n###?\s*Kapitel \d+:|$)/g;

  const chapters: ChapterType[] = [];

  let match;
  while ((match = chapterRegex.exec(storyText)) !== null) {
    const chapterTitle = `Kapitel ${match[1]}: ${match[2]}`;
    const chapterContent = match[3].trim();

    chapters.push({
      title: chapterTitle,
      content: chapterContent,
      image: null,
    });
  }

  return chapters;
};

export default generateChapters;
