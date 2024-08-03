import React from "react";
import "./signup.css"
import { useFirebase } from "../context/firebase";
import { useState } from "react";


const SignUp:React.FC = () =>{


    const Firebase = useFirebase();
    console.log(Firebase);

    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    
    return(
        <div className="signup-card-conatiner">

            <h3>Sign Up / Sign In</h3>
            <div className="email-container">
            <label htmlFor="email">Email </label>
            <input 
            type="email"
            required
            placeholder="Enter Your Email"
            onChange={(e)=>{SetEmail(e.target.value)}}
            value={email}
            />
            </div>
            <div className="password-container">
            <label htmlFor="password">Password </label>
            <input 
            type="password"
            required
            placeholder="Enter Your Password"
            onChange={(e)=>{SetPassword(e.target.value)}}
            value={password}
            />
            </div>

            <div className="button-conatiner">
            <button 
            className="signup-button"
            onClick={()=>{Firebase?.createUser(email,password);  Firebase?.putData("users",email + password)}}
            >Sign Up</button>

            <button className="signin-button"
            onClick={()=>{Firebase?.signinuser(email,password)}}
            >Sign In</button>
            </div>
        </div>
    )
};

export default SignUp;