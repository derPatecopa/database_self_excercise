import express from "express";
import {Book, BookStore} from "../models/book";

const store = new BookStore();

const index = async (_req: express.Request, res: express.Response) => {
    const books = await store.index();
    res.json(books);
}

export default index;