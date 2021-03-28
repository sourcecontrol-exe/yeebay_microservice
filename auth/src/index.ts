import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin';
import {signupRouter} from "./routes/signup";
import {signoutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handler"
import {NotFoundError } from "./errors/not-found-error"

const app = express();

app.use(json());

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter); 
app.use(errorHandler);

app.all('*', async (req,res)=>{
    throw new NotFoundError;
})

app.listen(3000,()=>{
    console.log("Listening to port 3000!!!!!")
})