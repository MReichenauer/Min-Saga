import { Router } from "express";
import uploadStory from "./post";

const firebaseRouter = Router();

firebaseRouter.post("/upload-story", uploadStory);

export default firebaseRouter;
