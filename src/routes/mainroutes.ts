import express from "express";
import booksroutes from "../routes/database/booksroute"


const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  res.send("This is database route");
});

routes.use("/books", booksroutes);



export default routes;
