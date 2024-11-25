import { Request, Response } from "express";
import createChapterImages from "../../helpers/dalle/createChapterImages";

const promptDalle = async (request: Request, response: Response) => {
  const story = request.body.story;

  if (!story) {
    response.status(400).send({ error: "story is required" });
    return;
  }
  try {
    const storyWithImages = await createChapterImages(story);
    response.status(200).send({ storyWithImages });
  } catch (error) {
    console.error("Error generating story images:", error);
    response.status(500).send({ error: "An error occurred while generating the story images" });
  }
};

export { promptDalle };
