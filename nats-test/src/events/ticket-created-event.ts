import { Subjects } from "./subjects"

export interface TickCreatedEvent{
    subject : Subjects.TicketCreated;
    data:{
        id: string;
        title: string;
        price : number;
    }
}