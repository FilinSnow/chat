import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionUser } from '../../store/actions/actionUser';
import { RootState } from '../../utils/types/types';


const WrapperAppRouter = (Component: any) => {
  const ShowComponent = (props: any) => {
    const { flag, setFlag } = props;
    const copyUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch()
    const [auth, setAuth] = useState(false);
    const tmpObj: any = localStorage.getItem('user')
    const user = useMemo(() => JSON.parse(tmpObj) || copyUser, [tmpObj, copyUser])

    useEffect(() => {
      window.onstorage = event => {
        if (event.key !== 'user') return;
        dispatch(actionUser({}))
        setFlag(!flag)
      };
    }, [window.onstorage])
    
    useEffect(() => {
      if (user || copyUser) {
        if (Object.keys(user).length === 0) {
          setAuth(false)
        } else {
          setAuth(true)
        }
      } else {
        setAuth(false)
      }
    }, [user, copyUser])

    return (
      <Component {...props} auth={auth} setAuth={setAuth} user={user} />
    )
  }
  return ShowComponent
}

export default WrapperAppRouter