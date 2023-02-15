import express from "express";
//import { Book } from "../../models/book";
import { index, show, create, edit, destroy } from "../../handlers/bookhandler";

const routes = express.Router();
//_ syntax means, that req is never being used, marks it as "throw away" argument, since it can not be ignored in this case
routes.get("/", index, async (_req: express.Request, res: express.Response) => {
  res.send("This is the index route");
});
routes.get(
  "/:id",
  show,
  async (_req: express.Request, res: express.Response) => {
    res.send("This is the show route");
  }
);

routes.post("/", create, (req: express.Request, res: express.Response) => {
  res.send("this is Create route");
});

routes.put("/:id", edit, (req: express.Request, res: express.Response) => {
  res.send("this is Edit route");
});
routes.delete(
  "/:id",
  destroy,
  (_req: express.Request, res: express.Response) => {
    res.send("this is Delete route");
  }
);

export default routes;
