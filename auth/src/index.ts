import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin';
import {signupRouter} from "./routes/signup";
import {signoutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handler"
import {NotFoundError } from "./errors/not-found-error"
import mongoose from "mongoose"
import cookieSession from "cookie-session"


const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    signed:false,
    secure: true
}))

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter); 
app.use(errorHandler);

app.all('*', async (req,res)=>{
    throw new NotFoundError;
})

const start = async () => {
    try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    console.log("connected to auth database")
    }
    catch(err){
        console.log(err);
    }
}

start();

app.listen(3000,()=>{
    console.log("Listening to port 3000!!!!!")
})