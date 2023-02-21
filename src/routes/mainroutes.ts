import express from "express";
import booksroute from "../routes/database/booksroute";
import usersroute from "../routes/database/usersroute";

const routes = express.Router();


routes.get("/", (req: express.Request, res: express.Response) => {
  res.send("This is database route");
});

//express.json middleware for getting json return types
routes.use("/book", express.json, booksroute);
routes.use("/users", express.json, usersroute);

export default routes;
