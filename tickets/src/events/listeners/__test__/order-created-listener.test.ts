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

it("sets the user Id of the ticket", async ()=>{

    const {listener, ticket ,data, msg} = await setUp();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(data.id);

    expect(updatedTicket!.orderId).toEqual(data.id);

})

it("acks the message", async ()=>{
    
    const {listener, ticket ,data, msg} = await setUp();

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled();
})

it('publishes a ticket updated event', async ()=>{

    const {listener, ticket ,data, msg} = await setUp();

    await listener.onMessage(data,msg);

   expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);

})