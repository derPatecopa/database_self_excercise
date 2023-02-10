// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";

// const app: express.Application = express();
// const address: string = "0.0.0.0:3000";

// app.use("/");

// app.get("/", function (req: Request, res: Response) {
//   res.send("Database server running");
// });

// app.listen(3000, function () {
//   console.log(`starting app on: ${address}`);
// });

//implemented my own logic for server with nodemon and a little routing to /database

import express, { Application } from "express";
import mainroutes from "./routes/mainroutes";
const app: Application = express();
const port = 3000;

//using app with routes
app.use("/database", mainroutes);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
