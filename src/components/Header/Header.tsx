import React, { FC, useContext } from 'react'
import { Context } from '../..'
import { IAuth } from '../../interfaces/auth'
import './Header.scss'
import { useNavigate } from "react-router-dom";

const Header: FC<IAuth> = ({flag, setFlag, auth: isCheckAuth}: IAuth) => {
  const {auth}: any = useContext(Context)
  let navigate = useNavigate();
  const logout = async () => {
    localStorage.clear()
    await auth.signOut()
    setFlag && setFlag(!flag)
    // return navigate('/login')
  }

  return (
    <div style={{width: '100%'}}>
      <div className="header__content">
        <div className="content">Chat</div>
        <div className="content">
        </div>
        {isCheckAuth ? (<div className="content">
          <button onClick={() => logout()}>LogOut</button>
        </div>) 
        : <div></div>  
      }
      </div>
    </div>
  )
}

export default Header