import React, { useState } from 'react'
import { Route, Routes, Navigate } from "react-router";
import { IAuth } from '../interfaces/auth';
import { privateRoutes, publicRoutes } from '../routes/routes';
import './AppRouter.scss'
import Header from './Header/Header';
import WrapperAppRouter from './HOC/WrapperAppRouter';

const AppRouter = ({flag, setFlag, auth, setAuth}: IAuth) => {
  const [theme, setTheme] = useState('defalt');
  console.log("theme from App", theme)

  return (
    <div className='wrapper'>
      <div className="wrapper__content">
        <div className="content__header">
          <Header 
            auth={auth} 
            flag={flag} 
            setFlag={setFlag} 
            setAuth={setAuth}
            theme={theme}
            setTheme={setTheme}
          />
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
                  <Navigate to="/chat" replace state={theme}/>
                }
              />
            </Routes>)
            :
            (<Routes>
              {
                publicRoutes.map(route => {
                  return <Route 
                    key={route.path} 
                    {...route} 
                    element={<route.element flag={flag} setFlag={setFlag}/>} 
                  />
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