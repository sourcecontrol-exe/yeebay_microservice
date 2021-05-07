import {Listener , OrderCreatedEvent, Subjects} from '@yeebaytickets/common';
 import {queueGroupName} from "./queue-group-name";
 import {Message} from 'node-nats-streaming';
 import {Ticket} from "../../models/ticket"
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

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

       await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price : ticket.price,
            version : ticket.version,
            title : ticket.title,
            userId : ticket.userId,
            orderId : ticket.orderId,
        });
        
        msg.ack();
    } 
}