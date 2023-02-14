import express from "express";
import { Book, BookStore } from "../models/book";

const store = new BookStore();

export const index = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (err) {
    res.send("Could not get books");
    console.error(err);
  }
  next();
};

export const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const book = await store.show(req.params.id);
      res.json(book);
    } catch (err) {
      res.send("Could not get books");
      console.error(err);
    }
    next();
  };

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export const edit =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export const destroy = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const deleted = await store.delete(req.body.id)
      res.json(deleted);
    } catch (err) {
      res.send("Could not get books");
      console.error(err);
    }
    next();
  };