import { FC } from 'react';
import { IAuth } from '../../utils/interfaces/interfaces';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { actionUser } from '../../store/actions/actionUser';

const Header: FC<IAuth> = ({flag, setFlag, auth: isCheckAuth}: IAuth) => {
  const dispatch = useDispatch()
  const logout = async () => {
    localStorage.clear()
    dispatch(actionUser({}))
    setFlag && setFlag(!flag)
  }

  return (
    <div style={{width: '100%'}}>
      <div className="header__content">
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