import {useState} from "react";

import axios from "axios"

export default () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError] = useState([]);

    const onSubmit =async (event) =>{
        event.preventDefault();
        try{
        const response  = await axios.post("/api/users/signup",{
             email,password})
        console.log(response.data)
        }
        catch(err){
            setError(err.response.data.errors);
        }
    }


    return <form onSubmit={onSubmit}>
        <h1> Sign Up </h1>
        <div className = "form-group">
            <label> Email Address</label>
            <input 
            value ={email}
            onchange = {e => setEmail(e.target.value)}
            className = 'form-contorol'></input>
        </div>
        <div className = "form-group">
            <label>Password</label>
            <input value={password}
            onChange = {e=>setPassword(e.target.value)}
            className = 'form-contorol' type="password"></input>
        </div>
        {errors.map(err=>
            err.message
        )}
        <button className ="btn btn-primary">Sign Up</button>
    </form> 
}