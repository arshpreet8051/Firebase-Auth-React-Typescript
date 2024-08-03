import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { createContext, ReactNode, useContext } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8PwE0U7An4ZI2GrBBTydUY97PTctxikQ",
  authDomain: "my-app-c32c4.firebaseapp.com",
  projectId: "my-app-c32c4",
  storageBucket: "my-app-c32c4.appspot.com",
  messagingSenderId: "197325356776",
  appId: "1:197325356776:web:452556949c8df4e582935d",
  measurementId: "G-CK1QRMBP9D",
  databaseURL:"https://my-app-c32c4-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Context interface
interface FirebaseContextValue {
  auth: typeof auth;
  putData: (key: string, value: string) => void;
  createUser: (email:string,password:string) => void;
  signinuser:(email:string,password:string)=>void
}

// Create context
const FirebaseContext = createContext<FirebaseContextValue | null>(null);

// Firebase provider component
interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const putData = (key: string, data: string) => {
    set(ref(database, key), data)
      .then(() => {
        console.log("Data set successfully");
      })
      .catch((error) => {
        console.error("Error setting data: ", error);
      });
  };

  const createUser = (email:string,password:string) =>{

    createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    console.log("User created successfully:", userCredential.user);
    alert("Sign Up Success");
  })
  .catch((error) => {
    // Log error details
    console.error("Error creating user: ", error.code, error.message);
    alert(`Error creating user: ${error.code} - ${error.message}`);
  });

  }

  const signinuser = (email:string,password:string) =>{
    signInWithEmailAndPassword(auth,email,password)
    .then((e)=>{alert("Sign in Success")})
    .catch((err)=>{alert("error" + err)})
  }

  return (
    <FirebaseContext.Provider value={{ auth, putData, createUser,signinuser }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook to use Firebase context
export const useFirebase = (): FirebaseContextValue | null => {
  return useContext(FirebaseContext);
};
