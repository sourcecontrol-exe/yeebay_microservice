import express,{Request, Response} from "express";
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from  "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";
import {User} from '../models/user'
import { BadRequestError } from "../errors/bad-request-error";
import jwt from 'jsonwebtoken';
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

    async (req: Request,res: Response)=>{
        const errors = validationResult(req);
  
        if(!errors.isEmpty()){
           throw new RequestValidationError(errors.array());
        }

        console.log("Creating a User...")

       const {email, password} =req.body

       const existingUser =  User.findOne({email});

       if(existingUser){
        throw new BadRequestError("Email in use")
       }

       const user = User.build({
           email,
           password
       })

        await user.save();

         // generate JWT

         const userJWT = jwt.sign({
             id: user.id,
             email: user.email
         },"asdf")

         // store it on session
          req.session= {
              jwt: userJWT
          }

       res.status(201).send(user);

})

export {router as signupRouter};