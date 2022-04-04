import React, { FC, useEffect, useMemo, useState } from 'react'

const WrapperAppRouter: any = (Component: any) => {
  
  // setAuth(false)
  const ShowComponent = (props: any) => {
    const [auth, setAuth] = useState(false);
    const [profile, setProfile] = useState({});
    const tmpObj: any = localStorage.getItem('user')
    const user = JSON.parse(tmpObj)
    // const tmpObj: any = useMemo(() => {
    //   return localStorage.getItem('user')
    // }, [localStorage.getItem('user')]) 
    
    useEffect(() => {
      // console.log(user);
      
      if (user) {
        if (Object.keys(user).length === 0) {
          setAuth(false)
        } else {
          setAuth(true)
        }
      } else {
        setAuth(false)
      }

    }, [user])
    
    return (
      <Component {...props} auth={auth} setAuth={setAuth}/>
    )
  }
  return ShowComponent
}

export default WrapperAppRouter