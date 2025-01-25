import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import gptRouter from "../src/openaiApi/routes";
import dalleRouter from "../src/openaiApi/dalle/routes";
import firebaseRouter from "../src/firebaseApi/routes";
import { stabilityRouter } from "../src/stabilityAI/routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From base address");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello test");
});

// Generate stories
app.use("/gpt", gptRouter);

// Generate images
app.use("/dalle", dalleRouter);
app.use("/stability", stabilityRouter);

// Communicate with firebase
app.use("/firebase", firebaseRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default (req: Request, res: Response) => {
  app(req, res);
};
