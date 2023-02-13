import express from 'express';
import {Book} from '../../models/book'
import indexhandler from "../../handlers/bookhandler";

const routes = express.Router();
//_ syntax means, that req is never being used, marks it as "throw away" argument, since it can not be ignored in this case
routes.get("/", indexhandler, async (_req: express.Request, res: express.Response, next: express.NextFunction)=> {
    res.send("This is the index route");
})

routes.get("/:id", async (_req: express.Request, res: express.Response)=> {
    res.send("This is the show route");
})

routes.post('/', (req:express.Request, res: express.Response) => {
    const book: Book = {
        //.body contains the parsed request body sent by the client, in this case a JSON book object 
        title: req.body.title,
        author: req.body.author,
        totalpages: req.body.totalpages,
        summary: req.body.totalpages
    }
    res.send('this is Create route');
})

routes.put('/:id', (req:express.Request, res: express.Response) => {
    const book: Book = {
        //.params is getting dynamic paramters, in this case for the book id
        id: (req.params.id as unknown) as number,
        title: req.body.title,
        author: req.body.author,
        totalpages: req.body.totalpages,
        summary: req.body.totalpages
    }
    res.send('this is Edit route');
})
routes.delete('/:id', (_req:express.Request, res: express.Response) => {
    res.send('this is Delete route');
})

export default routes;