import {Listener, ExpirationCompleteEvent, Subjects, OrderStatus} from "@yeebaytickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import {queueGroupName} from './queue-group-name';

import {OrderCancelledPublisher} from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg : Message)
    {
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error("Order-not-found")
        }
    
        order.set({
            status: OrderStatus.Cancelled,
        })

        await order.save();

        new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version : order.version,
            ticket: {
                id: order.ticket.id
            }
        });

        msg.ack();

    }

}