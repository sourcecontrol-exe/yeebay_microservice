import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';


const buildTicket = () =>{
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    return ticket
}

it("fectes orders for an partiular order", async ()=>{
    //create three  ticket
    const ticketOne = await buildTicket();
    const ticketTwo= await buildTicket();
    const ticketThree = await buildTicket();

    const UserOne = global.signin();
    const UserTwo = global.signin();

    await request(app)
    .post("/api/orders")
    .set('Cookie', UserOne)
    .send({ticketId : ticketOne.id})
    .expect (201);

    await request(app)
    .post("/api/orders")
    .set('Cookie', UserTwo)
    .send({ticketId : ticketTwo.id})
    .expect (201)

    await request(app)
    .post("/api/orders")
    .set('Cookie', UserTwo)
    .send({ticketId : ticketThree.id})
    .expect (201)

    // create one order as user numbe 1

    // create two orders as user Number 2

    //mkae sure we only go tthe order for user number 2
})