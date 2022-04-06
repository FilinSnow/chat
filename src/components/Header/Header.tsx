import React, { FC, useContext } from 'react';
import { Context } from '../..';
import { IAuth } from '../../interfaces/auth';
import ToggleThemeBtn from './SwitchTheme';

import './Header.scss';

const Header: FC<IAuth> = ({flag, setFlag, auth: isCheckAuth, theme, setTheme}: IAuth) => {
  const {auth}: any = useContext(Context)
  const logout = async () => {
    localStorage.clear()
    await auth.signOut()
    setFlag && setFlag(!flag)
  }

  return (
    <div style={{width: '100%'}}>
      <div className="header__content">
        {/* <ToggleThemeBtn theme={theme} setTheme={setTheme}/> */}
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