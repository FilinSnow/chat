
import React, { useState } from 'react'
import { Route, Routes, Navigate } from "react-router";
import { IAuth } from '../utils/interfaces/interfaces';
import { privateRoutes, publicRoutes } from '../routes/routes';
import './AppRouter.scss'
import Header from './Header/Header';
import WrapperAppRouter from './HOC/WrapperAppRouter';
import useChat from './hooks/useChat';

const AppRouter: any = ({ flag, setFlag, auth, setAuth, user }: IAuth) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const { messages, handleAddMessage } = useChat();

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
                return <Route key={route.path} {...route} element={<route.element theme={theme} messages={messages} handleAddMessage={handleAddMessage} user={user}/>} />
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
                  return <Route
                    key={route.path}
                    {...route}
                    element={<route.element flag={flag} setFlag={setFlag} setAuth={setAuth}/>}
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