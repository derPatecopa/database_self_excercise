import express from "express";
import { User, UserStore } from "../models/users";
import jwt, { Secret } from "jsonwebtoken";

const store = new UserStore();

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.send("Could not get users");
    console.error(err);
  }
  next();
};

export const show = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.send("Could not get user");
    console.error(err);
  }
  next();
};

export const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    user_name: req.body.username,
    user_password: req.body.user_password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(user);
  }
};

export const authenticate = async (
  req: express.Request,
  res: express.Response
) => {
  const user: User = {
    user_name: req.body.username,
    user_password: req.body.user_password,
  };
  try {
    const u = await store.authenticate(user.user_name, user.user_password);
    const token = jwt.sign(
      { user: u },
      process.env.TOKEN_SECRET as unknown as Secret
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
