import React, { useEffect, useState } from 'react'

const WrapperAppRouter: any = (Component: any) => {
  
  // setAuth(false)
  const ShowComponent = (props: any) => {
    const [auth, setAuth] = useState(false);
    const tmpObj: any = localStorage.getItem('user')
    const user = JSON.parse(tmpObj)
    
    useEffect(() => {
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