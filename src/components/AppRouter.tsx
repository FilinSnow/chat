import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, Navigate } from "react-router";
import { IAuth } from '../interfaces/auth';
import { privateRoutes, publicRoutes } from '../routes/routes';
import './AppRouter.scss'
import useProfileData from './Context/ContextAuth';
import Header from './Header/Header';
import WrapperAppRouter from './HOC/WrapperAppRouter';



const AppRouter = ({flag, setFlag, auth, setAuth}: IAuth) => {
  const tmpObj: any = localStorage.getItem('user')
  const user = JSON.parse(tmpObj)
  // console.log(flag);
  
  // function getProfileData() {
  //   console.log(1);
    
  //   const stringObj: any = localStorage.getItem('profile');
  //   if (typeof stringObj === 'object') {
  //     if (JSON.parse(stringObj)) {
  //       console.log(JSON.parse(stringObj));
        
  //       return JSON.parse(stringObj);
  //     }
  //   }
  //   return {}
  // }
  // function handleChangeStorage() {
  //   console.log(111);
    
  //   setProfile(getProfileData());
  // }

  // window.addEventListener('storage', handleChangeStorage);

  // console.log(profile);
  
  return (
    <div className='wrapper'>
      <div className="wrapper__content">
        <div className="content__header">
          <Header auth={auth} flag={flag} setFlag={setFlag} setAuth={setAuth}/>
        </div>
        <div className="content">
          {auth
            ?
            (<Routes>
              {privateRoutes.map(route => {
                return <Route key={route.path} {...route} element={<route.element />} />
              })}
              <Route
                path="*"
                element={
                  <Navigate to="/chat" replace />
                }
              />
            </Routes>)
            :
            (<Routes>
              {
                publicRoutes.map(route => {
                  return <Route key={route.path} {...route} element={<route.element flag={flag} setFlag={setFlag}/>} />
                })
              }
              <Route
                path="*"
                element={
                  <Navigate to="/login" replace />
                }
              />
            </Routes>)
          }
        </div>
      </div>

    </div>

  )
}

export default WrapperAppRouter(AppRouter)