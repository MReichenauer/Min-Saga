import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import gptRouter from "../src/openaiApi/routes";

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

app.use("/gpt", gptRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default (req: Request, res: Response) => {
  app(req, res);
};
