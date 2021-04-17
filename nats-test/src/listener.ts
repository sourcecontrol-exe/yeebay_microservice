import nats, {Message} from 'node-nats-streaming';
console.clear();

const stan = nats.connect('ticketing', '123',{
    url:"http://localhost:4222"
})

stan.on('connect', ()=>{
    console.log("connected to listener");

    const subscription = stan.subscribe("ticket:created")

    subscription.on('message', (msg:Message) =>{
        console.log("msg recived");
    })
})