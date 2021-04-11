import express,{Request, Response } from "express";
import {body} from 'express-validator';
import {validationRequest} from "@yeebaytickets/common";
import { BadRequestError} from "@yeebaytickets/common";
import {Password} from "../services/password";
import jwt from 'jsonwebtoken'

import { User} from "../models/user"
const router = express.Router();

router.post("/api/users/signin",[
    
    body('email')
    .isEmail()
    .withMessage("Email must be valid"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("You must apply a password")
    ],
    validationRequest,
     async (req: Request,res : Response)=>{ 
        const { email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(!existingUser){
             throw new BadRequestError("Invalid Credentials");
        }

         const passwordMatch = await Password.compare(existingUser.password, password)

         if(!passwordMatch){
             throw new BadRequestError("Invalid Credentials");
         }
        
         const userJWT = jwt.sign({
             id: existingUser.id,
             email: existingUser.email
         },process.env.JWT_KEY!)

         // store it on session
          req.session= {
              jwt: userJWT!
          } 

       res.status(200).send(existingUser);


      }
)
 
export {router as signinRouter};