export class DatabaseConnectionError extends Error {
    reason = 'Error connectiong to database';
     constructor()
     {
         super();

         Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
     }
}