import {Request , Response , NextFunction} from 'express'
import {RequestValidationError} from  "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";


export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction)=>{
     //  fromat arror in to a consistant Error Object with format of
     /*
            error:{
                message: String[], field?: string
            }[]
            array of objects
      */
    if(err instanceof RequestValidationError){
        const formattedError = err.errors.map(error =>{
            return {message : error.msg ,field: error.param };
        });
        
        return res.status(500).send({errors : formattedError});
    }

    if(err instanceof DatabaseConnectionError){
        console.log("handling this error as  database connection error")
        return res.status(500).send({errors : [
            {message : err.reason}
        ]})
    }

    res.status(400).send({
        message: [{
            message: "Something Went Wrong"
        }]
    })
} 