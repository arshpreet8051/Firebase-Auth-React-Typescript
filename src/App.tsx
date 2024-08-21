import {useEffect, useState} from 'react';
import './App.css';
import SignUp from './components/signup';
import { getAuth,onAuthStateChanged,signOut } from 'firebase/auth';
import {app} from "./context/firebase";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);

function App() {

  const [user,setUser] = useState<string|null>(null);

  useEffect(
    ()=>{
      onAuthStateChanged(auth,user=>{
        if(user){
          setUser(user.email);
        }
        else{
          setUser(null)
        }
      })
    },[])


    if(user){
      return(
        <div>
          <h1>Hello {user}</h1>
          <button onClick={()=>{signOut(auth)}}>Log Out</button>
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <SignUp/>
          <ToastContainer />
        </div>
      );
    }
}

export default App;