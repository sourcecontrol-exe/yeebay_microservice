import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

interface UserPayload{
    id: string,
    email: string
}
// tell typescript that it have an optional property of currentUser which is equal to UserPayload interface
declare global{
    namespace Express {
        interface Request  {
            currentUser? : UserPayload;
        }
    }
}

export const currentUser =(req: Request, res:Response , next: NextFunction)=>{

    if(!req.session?.jwt){
        return next();
    }

    try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
    }
    catch(err){

    }
    next()

} 