import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const Context = createContext({})

initializeApp({
  apiKey: "AIzaSyC1YBLRSvR0Fr4LeTR2nYTy8Vw6hKsOJmM",
  authDomain: "chat-6ddf9.firebaseapp.com",
  projectId: "chat-6ddf9",
  storageBucket: "chat-6ddf9.appspot.com",
  messagingSenderId: "885381004016",
  appId: "1:885381004016:web:d90693df9faeb1ef3b6035",
  measurementId: "G-3PQPM5WNB9"
});

const useSetUser = (data: any) => {
  const user = data
  return user
}

export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export let user: any = {}; 

export const signInPopup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const tmpUser = result.user;
      localStorage.setItem('user', JSON.stringify(tmpUser))
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}



function getProfileData() {
  const stringObj = localStorage.getItem('user') || 'Default Value'

  if (typeof stringObj === 'object') {
    if (JSON.parse(stringObj)) {
      return JSON.parse(stringObj);
    }
  }
  return {}
}

export default function useProfileData() {
  const [profile, setProfile] = useState(getProfileData());

  useEffect(() => {
    function handleChangeStorage() {
      setProfile(getProfileData());
    }

    window.addEventListener('storage', handleChangeStorage);
    return () => window.removeEventListener('storage', handleChangeStorage);
  }, []);

  return profile;
}