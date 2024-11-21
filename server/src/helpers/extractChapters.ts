const extractChapters = (storyText: string, storyTitle: string) => {
  const chapterSections = storyText.split(/(?=Kapitel \d+:)/).filter(Boolean);

  const chapters = chapterSections.map((section) => {
    const lines = section.split("\n");
    const title = lines[0].trim();
    const content = lines.slice(1).join("\n").trim();

    return {
      title,
      content,
      image: null,
    };
  });

  return chapters.filter((chapter) => chapter.title !== `# ${storyTitle}`);
};

export default extractChapters;
