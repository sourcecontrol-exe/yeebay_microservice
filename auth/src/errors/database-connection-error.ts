import {CustomError} from "./custom-error"

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    reason = 'Error connectiong to database';
     constructor()
     {
         super("error connecting to db");

         Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
     }

     serializeErrors(){
         return [{
            message : this.reason
         }]
     }
}