import express, {Request, Response} from "express";
import words from "./data/words";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.send(`Hey there, we have ${words.length} words which have 5 letters!`);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
