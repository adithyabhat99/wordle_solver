import express, { Request, Response } from "express";
import words from "./data/words";
import { WordleRequest } from "./models/WordleRequest";
import WordleService from "./service/wordleService";

const app = express();
app.use(express.json());
const port = 8080; // default port to listen
const wordleService: WordleService = new WordleService();

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.send(`Hey there, we have ${words.length} words which have 5 letters!`);
});

app.post("/probable-results", (req: Request, res: Response) => {
  try {
    const request: WordleRequest = req.body;
    if (!request) {
      throw Error("Wordle request is required");
    }
    const answer: string[] = wordleService.getProbableResults(request);
    return res.status(200).send(answer);
  } catch (error) {
    console.log("error in probable results: ", error);
    return res.status(500).send("Error occured");
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
