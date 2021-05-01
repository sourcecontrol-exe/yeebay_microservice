import express, {Request, Response} from "express";
import mongoose from "mongoose";

import {Ticket} from '../models/ticket';
import {Order} from "../models/order";

import {requireAuth, validationRequest, NotFoundError} from '@yeebaytickets/common'

import {body} from 'express-validator';


const router = express.Router();

router.post("/api/orders",requireAuth,[
    body("ticketId")
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("TicketId must be provided")],
    validationRequest,    
    async (req: Request, res :Response)=>{
        // find the ticket that user is trying to purchase

        const { ticketId } = req.body;
        const ticket = await Ticket.findById(ticketId);

        if(!ticket){
            return new NotFoundError();
        }
        //run query to lool at all orders.  ifnd an order wher the ticket is the ticket we just found *and* the orders status is *not*
        // canelled.
        //if we fiond an order from that means the ticket "is" reserved
         const order = await Order.findOne({
             ticket:ticket,
             status: {
                 $in: [
                     OrderStatus.Created,
                     OrderStatus.AwaitingPayment,
                     OrderStatus.Complete,
                 ]
             }
         })
        // make sure that this ticket is not already reserved
        // calculate an expiration date for an order ~15min.
        // build the order and save it to the database
        //publish an event sayign that an ordert was created.




    res.send({})  
})

export {router as newOrderRouter};