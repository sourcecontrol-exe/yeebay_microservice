import {Message} from "node-nats-streaming";
import {queueGroupName} from './queue-group-name'
import {Subjects, Listener, TicketUpdatedEvent} from '@yeebaytickets/common';
import {Ticket} from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    
    queueGroupName= queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const {id, title ,price} = data;
        
        const ticket = await Ticket.findByEvent(data);

        if(!ticket){
            throw new Error('ticket not found');
        }

        ticket.set({title, price});
        
        await ticket.save();

        msg.ack();
    }
}