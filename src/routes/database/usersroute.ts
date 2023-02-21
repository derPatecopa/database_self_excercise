import express from "express";
import * as user from "../../handlers/usershandler"

const routes = express.Router();

routes.post("/",user.create, (req: express.Request, res: express.Response)=> {
    //res.send("this is user create route");
})

export default routes;