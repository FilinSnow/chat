import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { FC, useContext } from 'react'
import { Context } from '../..';
import { IAuth } from '../../interfaces/auth';
// import { signInPopup } from '../Context/ContextAuth'


const Login: FC<IAuth> = ({flag, setFlag}: IAuth) => {
  
  const { auth, provider }: any = useContext(Context)
  const signInPopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const tmpUser = result.user;
        localStorage.setItem('user', JSON.stringify(tmpUser))
        setFlag && setFlag(true)
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
  const login = () => {
     signInPopup()
  }
  
  return (
    <div>
      <h2>Login</h2>
      <div className="wrapper__login">
        <button onClick={() => login()}>Login with google</button>
      </div>
    </div>
  )
}

export default Login