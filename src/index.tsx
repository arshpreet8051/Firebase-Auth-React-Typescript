import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FirebaseProvider} from "./context/firebase";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <FirebaseProvider>
    <App />
    </FirebaseProvider>
  </React.StrictMode>
);


