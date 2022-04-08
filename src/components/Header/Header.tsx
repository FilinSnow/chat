import React, { FC, useContext } from 'react';
import { Context } from '../..';
import { IAuth } from '../../interfaces/auth';
import ToggleThemeBtn from './SwitchTheme';
import ChatAvatar from './AvatarsCircle';
import {ReactComponent as ExitIcon} from '../../img/Exit.svg';

import './Header.scss';

const Header: FC<IAuth> = ({flag, setFlag, auth: isCheckAuth, theme, setTheme}: IAuth) => {
  const {auth}: any = useContext(Context)
  const logout = async () => {
    localStorage.clear()
    await auth.signOut()
    setFlag && setFlag(!flag)
  }

  console.log(Context)

  return (
    <div style={{width: '100%'}}>
      <div className="header__content">
        <ToggleThemeBtn theme={theme} setTheme={setTheme}/>
        <div className="content">
          <ChatAvatar />
        </div>
        {isCheckAuth ? (<div className="content">
          <ExitIcon onClick={() => logout()} />
        </div>) 
        : <div></div>  
      }
      </div>
    </div>
  )
}

export default Header