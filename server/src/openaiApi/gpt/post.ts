import { Request, Response } from "express";
import { gptPrompt } from "../../openai/prompts/gptPrompt";
import { StoryType } from "../../models/GlobalTypes";

const promptGpt = async (request: Request, response: Response) => {
  const mainCharacterName = request.body.mainCharacterName;
  const mainCharacterType = request.body.mainCharacterType;
  const environment = request.body.environment;
  const targetedAge = request.body.targetedAge;

  if (!mainCharacterName || !mainCharacterType || !targetedAge || !environment) {
    response
      .status(400)
      .send({ error: "mainCharacterName, mainCharacterType, environment and targetedAge are required" });
    return;
  }

  try {
    const storyResponse = await gptPrompt(mainCharacterName, mainCharacterType, environment, targetedAge);
    if (!storyResponse) {
      response.status(500).send({ error: "Failed to generate a story" });
      return;
    }

    const story: StoryType = storyResponse;
    if (!story.title || !story.chapters || !Array.isArray(story.chapters)) {
      response.status(500).send({ error: "Failed to generate a story in valid format" });
      return;
    }

    response.status(200).send({ data: story });
  } catch (error) {
    console.error("Error generating story:", error);
    response.status(500).send({ error: "An error occurred while generating the story" });
  }
};

export { promptGpt };
