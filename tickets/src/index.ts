import "express-async-errors";
import mongoose from "mongoose"
import  {app} from "./app";

import {natsWrapper} from './nats-wrapper';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined");
    }
    if(!process.env.MONGO_URI){
        throw new Error("Define MONGO_URI")
    }
    try{
    await natsWrapper.connect('ticketing', 'abcdef', "http://nats-srv:4222")
    natsWrapper.client.on('close', ()=>{
        console.log("Nats Connection was closed");
        process.exit();
    })

    process.on('SIGINT', ()=> natsWrapper.client.close());
    process.on('SIGTERM', ()=> natsWrapper.client.close());


    await mongoose.connect(process.env.MONGO_URI, {
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