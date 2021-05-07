import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import { Ticket } from '../../../models/ticket';
import { OrderCreatedEvent, OrderStatus } from "@yeebaytickets/common";
import mongoose  from 'mongoose';
import {Message} from 'node-nats-streaming';

const setUp = async ()=>{
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title : 'concer',
        price: 989,
        userId: 'asdf'
    });

    await ticket.save();

    //create the fake data event

    const data : OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: 'asdf',
    ticket: {
        id: ticket.id,
        price: ticket.price,
    }
    }
    // @ts-ignore
    const msg : Message ={
        ack :jest.fn()
    }


    return {listener, ticket, data,msg}
}