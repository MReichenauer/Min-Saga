const extractTitle = (storyText: string): string => {
  const firstLine = storyText.split("\n")[0].trim();
  return firstLine.replace(/^#\s*/, "").replace(/^\*\*|\*\*$/g, "");
};

export default extractTitle;
