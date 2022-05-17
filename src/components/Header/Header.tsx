import { FC } from 'react';
import { IAuth } from '../../utils/interfaces/interfaces';
import './Header.scss';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { actionUser } from '../../store/actions/actionUser';
import Switch from '@mui/material/Switch';

const Header: FC<IAuth> = ({ flag, setFlag, auth: isCheckAuth }: IAuth) => {
  const LS = useSelector((state: RootStateOrAny) => state.theme.theme);
  const dispatch = useDispatch()
  const logout = async () => {
    localStorage.clear()
    dispatch(actionUser({}))
    setFlag && setFlag(!flag)
  }

  const changeThemeColor = (color: string) => {
    localStorage.setItem('theme', color);
    dispatch({
      type: 'CHANGE_THEME',
      payload: color
    });
  }

  return (
    <div style={{ width: '100%', borderBottom: '1px solid silver' }}>
      <div className="header__content" style={{ background: LS === 'black' ? '#1F2023' : '' }}>
        <div className="content">
          <Switch defaultChecked={LS === 'white' ? false : true} size="small" onChange={() => LS === 'white' ? changeThemeColor('black') : changeThemeColor('white') } />
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