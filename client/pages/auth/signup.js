
import {useState} from "react";
export default () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) =>{
        event.preventDefault();

        console.log(email, password)
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
        <button className ="btn btn-primary">Sign Up</button>
    </form>
}