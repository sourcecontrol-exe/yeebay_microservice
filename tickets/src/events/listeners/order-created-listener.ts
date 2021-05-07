import {Listener , OrderCreatedEvent, Subjects} from '@yeebaytickets/common';
 import {queueGroupName} from "./queue-group-name";
 import {Message} from 'node-nats-streaming';
 import {Ticket} from "../../models/ticket"

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject : Subjects.OrderCreated = Subjects.OrderCreated;
    
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg : Message){
        // reach into ticket collection that the order is reserving
         //if no ticket , throw error
         // mark the ticke rtas being reserved by  setting its order Id property
         // save the ticket
         //ack the message
        const ticket = await Ticket.findById(data.ticket.id);

        if(!ticket){
            throw new Error("ticket not found")
        }

        ticket.set({ orderId: data.id});

        await ticket.save();
        
        msg.ack();
    } 
}