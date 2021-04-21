import {Publisher, Subjects, TicketCreatedEvent} from '@yeebaytickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
     subject : Subjects.TicketCreated = Subjects.TicketCreated;
}

