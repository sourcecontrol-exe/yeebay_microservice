import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validationRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@yeebaytickets/common';
import { Order } from '../model/order';
import {stripe} from "../stripe";
import {Payment} from '../model/payment';
import {PaymentsCreatedPublisher} from '../events/publisher/payments-created-publisher';
import {natsWrapper} from "../nats-wrapper";

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validationRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }
    const charge = await stripe.charges.create({
      currency : 'usd',
      amount : order.price*100,
      source: token,
    })
    const payment = Payment.build({
      orderId,
      stripeId : charge.id,
    })

    await payment.save();


    new PaymentsCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId : payment.stripeId,
    })

    res.status(201).send({id: payment.id });
  }
);

export { router as createChargeRouter };
