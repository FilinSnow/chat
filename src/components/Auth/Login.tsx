import React, { FC, useEffect, useState } from 'react'
import { IAuth } from '../../interfaces/auth';
import { useLocation, useNavigate } from "react-router-dom";
import './Login.scss'
import { getUser, loginUser } from '../../store/reducers/AuthReducer';
import { useDispatch } from 'react-redux';

interface IFormData {
  displayName: string;
  email: string;
  roomId: string;
  password: string;
}
interface IOnChange {
  setFormData: (val: (prevprops: IFormData) => IFormData) => void
}

const Login: FC<IOnChange & IAuth> = ({ flag, setFlag, setAuth }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Omit<IFormData, 'displayName'>>({
    email: '',
    password: '',
    roomId: 'main_room',
  })
  const location = useLocation();
  const dispatch = useDispatch();

  const handleFormData = (prop: keyof IFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [prop]: event.target.value,
    });
  };

  const handleMoveGoogle = () => {
    window.open('https://exceed-chat-app.herokuapp.com/google-auth', '_self')
  }
  
  useEffect(() => {
    if(location.search) {
      dispatch(getUser(location.search))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const navigateRegisterPage = () => {
    navigate('/register')
  }

  const login = () => {
    const copyFormData = {
      email: formData.email,
      password: formData.password
    }
    dispatch(loginUser(copyFormData))
  } 

  return (
    <div className="container__login">
      <h2>Login</h2>
      <div className="form">
        <div className="container">
          <div className="form-field">
            <p>Email</p>
            <input 
              className="form-input" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleFormData('email')} 
            />
          </div>
          <div className="form-field">
            <p>Password</p>
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
        <div className="button inline-button" onClick={navigateRegisterPage}>
          <div className="content">
            <p className="text">Register</p>
          </div>
        </div>
      </div>
      <div className="button" onClick={handleMoveGoogle}>
        <div className="content">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="google-auth" 
          />
          <p className="text">Sign in with Google</p>
        </div>
      </div>
    </div>
  )
}

export default Login
