import express,{Request, Response} from "express";
import {body, validationResult} from 'express-validator';
const router = express.Router();

router.post("/api/users/signup",
    [
    body('email')
    .isEmail()
    .withMessage("Email must be valid"),
    body('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage("Enter a valid password")
    ],

    (req: Request,res: Response)=>{
        const errors = validationResult(req);
  
        if(!errors.isEmpty()){
           throw new Error("Invalid Email or password"); 
        }

        const {email, password} = req.body;

        console.log("Creating a User...")

        res.send({});

})

export {router as signupRouter};