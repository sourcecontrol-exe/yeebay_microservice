import express from "express";
import {json} from "body-parser";
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin';
import {signupRouter} from "./routes/signup";
import {signoutRouter} from "./routes/signout";

const app = express();

app.use(json());

app.use(currentUserRouter,signoutRouter,signupRouter,signinRouter);


app.listen(3000,()=>{
    console.log("Listening to port 3000!!!!!")
})