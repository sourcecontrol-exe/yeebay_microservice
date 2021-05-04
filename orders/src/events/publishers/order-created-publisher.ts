import {Publisher, OrderCreatedEvent, Subjects} from '@yeebaytickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject : Subjects.OrderCreated = Subjects.OrderCreated;
}
