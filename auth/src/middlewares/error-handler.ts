import {Request , Response , NextFunction} from 'express'
import {CustomError} from "../errors/custom-error"


export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction)=>{
     //  fromat arror in to a consistant Error Object with format of
     /*
            error:{
                message: String[], field?: string
            }[]
            array of objects
      */
    if(err instanceof CustomError){
        return res.status(err.statusCode).send({errors : err.serializeErrors() });
    }
    res.status(400).send({
        message: [{
            message: "Something Went Wrong"
        }]
    })
} 