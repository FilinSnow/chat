import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { auth, provider } from './components/Context/ContextAuth';

export const Context = createContext({})

initializeApp({
  apiKey: "AIzaSyDEWiEvLa5WWP80czHSXKxjOTnET6mgfT4",
  authDomain: "chat-dcde3.firebaseapp.com",
  projectId: "chat-dcde3",
  storageBucket: "chat-dcde3.appspot.com",
  messagingSenderId: "88588184226",
  appId: "1:88588184226:web:9235a6c915233dffa245fb",
  measurementId: "G-49QNSTY8X4"
});

export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export const db = getFirestore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Context.Provider value={
          {
            auth,
            provider,
            db
          }
        }>
          <App />
        </Context.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
