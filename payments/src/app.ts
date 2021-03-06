import express from "express";
import {json} from "body-parser";

import {errorHandler} from "@yeebaytickets/common"
import {NotFoundError } from "@yeebaytickets/common"
import cookieSession from "cookie-session"
import {createChargeRouter} from "./routes/new"

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== "test"
}))

app.use(errorHandler);
app.use(createChargeRouter);
app.all('*', async (req,res)=>{
    throw new NotFoundError;
})

export {app};