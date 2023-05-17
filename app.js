import express from "express";
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMid } from "./middlewares/error.js";

export const app = express();

config({
    path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/",(req,res) => {
   res.send("Nice Working");
});


app.listen(4000, ()=>{
    console.log("Server is running");
});

app.use(errorMid);