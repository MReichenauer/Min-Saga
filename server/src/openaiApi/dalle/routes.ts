import { Router } from "express";
import { promptDalle } from "./post";

const dalleRouter = Router();

dalleRouter.post("/", promptDalle);

export default dalleRouter;
