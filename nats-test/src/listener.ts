import nats, {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'crypto';



console.clear();


const stan = nats.connect('ticketing', randomBytes(4).toString("hex"),{
    url:"http://localhost:4222"
})

stan.on('connect', ()=>{
    console.log("connected to listener"); 

    stan.on('close',()=>{
        console.log("NATS connection closed!");
        process.exit();
    })

    const options = stan.subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-serevice");

    const subscription = stan.subscribe("ticket:created", options)

    subscription.on('message', (msg:Message) =>{
        console.log("msg recived");
        const data = msg.getData()

        if(typeof data == 'string'){
            console.log(`Recived Event #${msg.getSequence()} with data : ${data}`)
        }
        msg.ack()
    })
})

process.on('SIGINT',()=>stan.close());
process.on("SIGTERM",()=>stan.close());