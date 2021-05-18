import "express-async-errors";

import {OrderCreatedListener} from "./events/listeners/order-created-listener";

import {natsWrapper} from './nats-wrapper';

const start = async () => {
    
    if(!process.env.NATS_CLIENT_ID){
        throw new Error("Define MONGO_URI")
    }
    if(!process.env.NATS_URL){
        throw new Error("Define MONGO_URI")
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error("Define MONGO_URI")
    }
    try{
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    natsWrapper.client.on('close', ()=>{
        console.log("Nats Connection was closed");
        process.exit();
    })

    process.on('SIGINT', ()=> natsWrapper.client.close());
    process.on('SIGTERM', ()=> natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();  

    }
    catch(err){
        console.log(err);
    }
}

start();
 
