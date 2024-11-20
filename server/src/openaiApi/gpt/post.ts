import { Request, Response } from "express";
import { gptPrompt } from "../../openai/gptPrompt";
import generateChapters from "../../helpers/generateChapters";

const promptGpt = async (request: Request, response: Response) => {
  const mainCharacter = request.body.mainCharacter;
  const environment = request.body.environment;
  const targetedAge = request.body.targetedAge;

  if (!mainCharacter || !targetedAge || !environment) {
    response.status(400).send({ error: "mainCharacter, environment and targetedAge are required" });
    return;
  }

  try {
    const storyResponse = await gptPrompt(mainCharacter, targetedAge, environment);
    const storyText = storyResponse.content;

    if (!storyText) {
      response.status(500).send({ error: "Failed to generate story" });
      return;
    }

    const storyTitle = storyText
      .split("\n")[0]
      .trim()
      .replace(/^#\s*/, "")
      .replace(/^\*\*|\*\*$/g, "");

    const chapters = generateChapters(storyText);

    const story = {
      title: storyTitle,
      chapters: chapters,
    };

    response.status(200).send({ story });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "An error occurred while generating the story" });
  }
};

export { promptGpt };
