import express,{Request, Response} from "express";
import {body} from 'express-validator';
import {validationRequest} from "@yeebaytickets/common";
import {DatabaseConnectionError} from "@yeebaytickets/common";
import {User} from '../models/user'
import { BadRequestError } from "@yeebaytickets/common";
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
    validationRequest,
   async (req: Request,res: Response)=>{
        

        console.log("Creating a User...")

       const {email, password} =req.body

       const existingUser = await User.findOne({email});

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
         },process.env.JWT_KEY!)

         // store it on session
          req.session= {
              jwt: userJWT!
          } 

       res.status(201).send(user);

})

export {router as signupRouter};