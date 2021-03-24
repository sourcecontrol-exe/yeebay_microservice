import express from "express";

const router = express.Router();

router.get("/api/users/signup",(req,res)=>{
 res.send("Hi There!!!")
})

export {router as signupRouter};