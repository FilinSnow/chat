import React, { FC, useEffect, useState } from 'react'
import { IAuth, IFormDataLogin, IOnChangeLogin } from '../../utils/interfaces/interfaces';
import { useLocation, useNavigate } from "react-router-dom";
import './Login.scss'
import { getUser, loginUser } from '../../store/reducers/AuthReducer';
import { useDispatch } from 'react-redux';
import { ReactComponent as GoogleIcon } from '../../img/googleLogo.svg';

const Login: FC<IOnChangeLogin & IAuth> = ({ flag, setFlag, setAuth }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Omit<IFormDataLogin, 'displayName'>>({
    email: '',
    password: '',
    roomId: 'main_room',
  })
  const location = useLocation();
  const dispatch = useDispatch();
  const handleFormData = (prop: keyof IFormDataLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [prop]: event.target.value,
    });
  };

  const handleMoveGoogle = () => {
    window.open('https://exceed-chat-app.herokuapp.com/google-auth', '_self');
  }
  
  useEffect(() => {
    if (location.search) {
      dispatch(getUser(location.search));
    }
  }, [location.search, dispatch]);

  const login = () => {
    dispatch(loginUser({
      email: formData.email,
      password: formData.password
    }));
  } 

  return (
    <div className="container__login">
      <h2>Login</h2>
      <div className="form">
        <div className="container">
          <div className="form-field">
            <span>Email</span>
            <input 
              className="form-input" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleFormData('email')} 
            />
          </div>
          <div className="form-field">
            <span>Password</span>
            <input 
              className="form-input"
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleFormData('password')}
            />
          </div>
          <p className="reminder-text">Work again? Forever 💻</p>  
        </div>
      </div>

      <div className="buttons" onClick={login}>
        <div className="button inline-button">
          <div className="content">
            <p className="text">Login</p>
          </div>
        </div>
        <div className="button inline-button" onClick={() => navigate('/register')}>
          <div className="content">
            <p className="text">Register</p>
          </div>
        </div>
      </div>
      <div className="button" onClick={handleMoveGoogle}>
        <div className="content">
          <GoogleIcon />
          <p className="text">Sign in with Google</p>
        </div>
      </div>
    </div>
  )
}

export default Login;
