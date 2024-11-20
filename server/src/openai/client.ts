import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openAiClient;
