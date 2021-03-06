import express from "express";
import {json} from "body-parser";
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin';
import {signupRouter} from "./routes/signup";
import {signoutRouter} from "./routes/signout";
import {errorHandler} from "@yeebaytickets/common"
import {NotFoundError } from "@yeebaytickets/common"
import cookieSession from "cookie-session"


const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== "test"
}))

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter); 
app.use(errorHandler);

app.all('*', async (req,res)=>{
    throw new NotFoundError;
})

export {app};