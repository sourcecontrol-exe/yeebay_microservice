import express, {
    Request,
    Response,
} from 'express';

import { body } from 'express-validator';

import {
    requireAuth,
    validationRequest,
    BadRequestError,
    NotFoundError
}
    from '@yeebaytickets/common';
import { Order } from '../model/order';

const router = express.Router();

router.post("/api/paymesnts", requireAuth,
    [
        body("token").not().notEmpty(),
        body('orderId').not().isEmpty()
    ],
    async(req: Request, res: Response)=>{
        res.send({success : true});
    }
);

export {router  as createChargeRouter}