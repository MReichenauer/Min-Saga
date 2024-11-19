import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From base address");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default (req: Request, res: Response) => {
  app(req, res);
};
