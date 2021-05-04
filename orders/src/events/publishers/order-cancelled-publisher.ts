import {Publisher, OrderCancelledEvent, Subjects} from '@yeebaytickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject : Subjects.OrderCancelled = Subjects.OrderCancelled;
}
