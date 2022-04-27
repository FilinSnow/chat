import React, { FC, useEffect, useState } from 'react'
import { IAuth } from '../../interfaces/auth';
import { useLocation, useNavigate } from "react-router-dom";
import './Login.scss'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getUser, loginUser } from '../../store/reducers/AuthReducer';
import { useDispatch } from 'react-redux';


interface IFormData {
  displayName: string;
  email: string;
  roomId: string;
  password: string;
  showPassword: boolean;
}
interface IOnChange {
  setFormData: (val: (prevprops: IFormData) => IFormData) => void
}

const Login: FC<IOnChange & IAuth> = ({ flag, setFlag, setAuth }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Omit<IFormData, 'displayName'>>({
    email: '',
    password: '',
    showPassword: false,
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
    window.open('https://docker-chat-app.herokuapp.com/google-auth', '_self')
  }
  
  useEffect(() => {
    if(location.search) {
      dispatch(getUser(location.search))
      // navigate('/chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
      <div className="wrapper__login">
        <div style={{ width: '100%' }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            value={formData.email}
            onChange={handleFormData('email')} 
            style={{ width: '100%' }} 
          />
            
        </div>
        <div>
          <FormControl sx={{ m: 1 }} variant="outlined" style={{ width: '100%', margin: '12px 0' }}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={formData.showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleFormData('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <Button variant="contained" sx={{mr: '8px'}} onClick={login}>Login</Button>
        <Button variant="contained" sx={{mr: '8px'}} onClick={handleMoveGoogle}>Login Google</Button>
        <Button color="secondary" variant="outlined" onClick={navigateRegisterPage}>Register</Button>
      </div>
    </div>
  )
}

export default Login