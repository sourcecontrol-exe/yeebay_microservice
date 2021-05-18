import Queue from 'bull';

interface Payload {
    orderId : string;

}

const expirationQueue  = new Queue<Payload>('order:expiration',{
    redis:{
        host: process.env.REDIS_HOST 
    }
});

expirationQueue.process(async(job)=>{
    console.log("I Want To Publish an Expiration: complete event for OrderId", job.data.orderId)
})

export {expirationQueue};