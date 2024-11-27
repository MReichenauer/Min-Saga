import { Router } from "express";
import uploadStory from "./post";
import getAllStories from "./get/getAllStories";
import getStoryById from "./get/getStoryById";

const firebaseRouter = Router();

firebaseRouter.post("/upload-story", uploadStory);
firebaseRouter.get("/stories", getAllStories);
firebaseRouter.get("/stories/:id", getStoryById);

export default firebaseRouter;
