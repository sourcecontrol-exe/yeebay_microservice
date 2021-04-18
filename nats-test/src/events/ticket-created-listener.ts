import {Listener} from "./base-listener"
import {Message} from 'node-nats-streaming';
import {TickCreatedEvent} from "./ticket-created-event";
import {Subjects} from './subjects';

export class TicketCreatedListener extends Listener<TickCreatedEvent>{

    subject : Subjects.TicketCreated = Subjects.TicketCreated 
    queueGroupName = 'payments-service';
    onMessage(data : any,msg: Message){
        console.log('Event data!', data);

        msg.ack();
    }
}