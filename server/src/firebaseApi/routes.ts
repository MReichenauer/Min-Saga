import { Router } from "express";
import uploadStory from "./post";
import getAllStories from "./get/getAllStories";
import getStoryById from "./get/getStoryById";

const firebaseRouter = Router();

firebaseRouter.post("/upload-story", uploadStory);
firebaseRouter.get("/stories/user/:uid", getAllStories);
firebaseRouter.get("/stories/:id/user/:uid", getStoryById);

export default firebaseRouter;
