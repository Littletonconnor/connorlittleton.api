import express, { Request, Response } from "express";
import { router } from "./router";
import { protect } from "./auth";
import path from "path";

const app = express();

const port = 5000;

// TODO: add middleware

app.use(express.static("static"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.use("/api", protect, router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
