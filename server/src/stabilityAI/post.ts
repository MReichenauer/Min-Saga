import { Request, Response } from "express";
import createChapterImages from "../helpers/dalle/createChapterImages";
import { StoryType } from "../models/GlobalTypes";
import { createAndUploadRefImg } from "../helpers/createAndUploadRefImg";
import { generateAndUploadChapterImgs } from "../helpers/stability/generateAndUploadChapterImgs";

const promptStableImage = async (request: Request, response: Response) => {
  const story: StoryType = request.body.story;

  if (!story) {
    response.status(400).send({ error: "story is required" });
    return;
  }

  const { imgUrl, seed } = await createAndUploadRefImg(story);

  try {
    const storyWithImages = await generateAndUploadChapterImgs(story, seed);
    response.status(200).send({ data: storyWithImages });
  } catch (error) {
    console.error("Error generating story images:", error);
    response.status(500).send({ error: "An error occurred while generating the story images" });
  }
};

export { promptStableImage };
