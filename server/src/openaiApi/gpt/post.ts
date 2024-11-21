import { Request, Response } from "express";
import { gptPrompt } from "../../openai/gptPrompt";
import { StoryType } from "../../models/GlobalTypes";

const promptGpt = async (request: Request, response: Response) => {
  const mainCharacter = request.body.mainCharacter;
  const environment = request.body.environment;
  const targetedAge = request.body.targetedAge;

  if (!mainCharacter || !targetedAge || !environment) {
    response.status(400).send({ error: "mainCharacter, environment and targetedAge are required" });
    return;
  }

  try {
    const storyResponse = await gptPrompt(mainCharacter, environment, targetedAge);
    if (!storyResponse) {
      response.status(500).send({ error: "Failed to generate a story" });
      return;
    }

    const story: StoryType = JSON.parse(storyResponse);

    if (!story.title || !story.chapters || !Array.isArray(story.chapters)) {
      response.status(500).send({ error: "Failed to generate a story in valid format" });
      return;
    }

    response.status(200).send({ story });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "An error occurred while generating the story" });
  }
};

export { promptGpt };
