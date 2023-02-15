import express from "express";
import { Book, BookStore } from "../models/book";
import jwt, { Secret } from "jsonwebtoken";

const store = new BookStore();

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (err) {
    res.send("Could not get books");
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
    const book = await store.show(req.params.id);
    res.json(book);
  } catch (err) {
    res.send("Could not get book");
    console.error(err);
  }
  next();
};

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //auhtorization for creating a book, only for logged in users
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1] as string;
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    //returns because authentication failed
    return;
  }
  try {
    const book: Book = {
      //.body contains the parsed request body sent by the client, in this case a JSON book object
      title: req.body.title,
      author: req.body.author,
      totalpages: req.body.totalpages,
      summary: req.body.totalpages,
    };
    res.json(book);
  } catch (err) {
    res.send("Could not get books");
    console.error(err);
  }
  next();
};

export const edit = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const book: Book = {
      //.params is getting dynamic paramters, in this case for the book id
      id: req.params.id as unknown as number,
      title: req.body.title,
      author: req.body.author,
      totalpages: req.body.totalpages,
      summary: req.body.totalpages,
    };
    res.json(book);
  } catch (err) {
    res.send("Could not get books");
    console.error(err);
  }
  next();
};

export const destroy = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1] as string;
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.send("Could not get books");
    console.error(err);
  }
  next();
};
