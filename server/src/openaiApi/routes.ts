import { Router } from "express";
import { promptGpt } from "./gpt/post";

const gptRouter = Router();

gptRouter.post("/", promptGpt);

export default gptRouter;
