import express, { Express } from "express";
import cors from "cors";
import broadcastUserOp from "./routes/broadcastUserOp";
import deploySmartAccount from "./routes/deploySmartAccount";

//declare a new express app
const app: Express = express();

// Allow requests from all origins
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use("/bundler/deploySmartAccount", deploySmartAccount);
app.use("/bundler/broadcastUserOp", broadcastUserOp);

export default app;