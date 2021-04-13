import express, {Request, Response} from 'express';
import {requireAuth, validationRequest} from "@yeebaytickets/common"
import {body} from 'express-validator';

const router =  express.Router();

router.post("/api/tickets",requireAuth,[
    body("title")
    .not()
    .isEmpty()
    .withMessage("this is requied"),

    body('price')
    .isFloat({gt:0})
    .withMessage("shoul dbe greater than zero")



    ], validationRequest, (req : Request , res: Response)=>{
    res.sendStatus(200);
})

export {router as createTicketRouter};