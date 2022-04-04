import { signInWithPopup } from 'firebase/auth';
import React, { FC, useContext } from 'react'
import { Context } from '../..';
import { IAuth } from '../../interfaces/auth';


const Login: FC<IAuth> = ({flag, setFlag}: IAuth) => {
  
  const { auth, provider }: any = useContext(Context)
  
  const signInPopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const tmpUser = result.user;
        localStorage.setItem('user', JSON.stringify(tmpUser))
        setFlag && setFlag(true)
      }).catch((error) => {
        throw new Error(error)
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