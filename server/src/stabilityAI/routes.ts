import { Router } from "express";
import { promptStableImage } from "./post";

const stabilityRouter = Router();

stabilityRouter.post("/", promptStableImage);

export { stabilityRouter };
