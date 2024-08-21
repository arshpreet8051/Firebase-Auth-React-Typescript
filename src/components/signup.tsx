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

            <h3>Log In</h3>
            <div className="email-container">
            <label htmlFor="email">Email </label><br />
            <input 
            className="email-input"
            type="email"
            required
            
            onChange={(e)=>{SetEmail(e.target.value)}}
            value={email}
            />

            </div>
            <div className="password-container">
            <label htmlFor="password">Password </label><br />
            <input 
            type="password"
            required
            onChange={(e)=>{SetPassword(e.target.value)}}
            value={password}
            />
                
            </div>
            <button className="login-button"
            onClick={()=>{Firebase?.signinuser(email,password)}}
            >Log In</button>
            
             <p>Or login with</p>

            <button className="loginwithgoogle-button"
            onClick={()=>{Firebase?.signinwithgoogle()}}> <img src="./google.png" alt="" className="google-logo" />  Log in with Google</button> 

            <p>Don't have an account ?</p>
            
            <button 
            className="signup-button"
            onClick={()=>{Firebase?.createUser(email,password);  Firebase?.putData("users",email + password)}}
            >Sign Up</button>
                
        </div>
    )
};

export default SignUp;