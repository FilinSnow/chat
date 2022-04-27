import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const WrapperAppRouter: any = (Component: any) => {
  
  const ShowComponent = (props: any) => {
    const copyUser = useSelector((state: RootState) => state.auth.user)
    const [auth, setAuth] = useState(false);
    const tmpObj: any = localStorage.getItem('user')
    const user = useMemo(() =>  JSON.parse(tmpObj) || copyUser, [tmpObj, copyUser])
    
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
      <Component {...props} auth={auth} setAuth={setAuth}/>
    )
  }
  return ShowComponent
}

export default WrapperAppRouter