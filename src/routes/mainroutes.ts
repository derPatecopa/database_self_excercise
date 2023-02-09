import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("This is database route");
});


export default routes;