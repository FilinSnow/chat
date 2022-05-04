import React, { FC, useContext } from 'react';
import { Context } from '../..';
import { IAuth } from '../../utils/interfaces/interfaces';
import ToggleThemeBtn from './SwitchTheme';

import './Header.scss';
import { useDispatch } from 'react-redux';
import { actionUser } from '../../store/actions/actionUser';

const Header: FC<IAuth> = ({flag, setFlag, auth: isCheckAuth, theme, setTheme}: IAuth) => {
  const dispatch = useDispatch()
  const logout = async () => {
    localStorage.clear()
    dispatch(actionUser({}))
    setFlag && setFlag(!flag)
  }

  return (
    <div style={{width: '100%'}}>
      <div className="header__content">
        <ToggleThemeBtn theme={theme} setTheme={setTheme}/>
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