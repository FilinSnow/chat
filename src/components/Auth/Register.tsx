
import React, { FC, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.scss'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/reducers/AuthReducer';
import { actionUser } from '../../store/actions/actionUser';

interface IFormData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  showPassword: boolean;
  confirmPassword: string;
  showPasswordConfirm: boolean;
}

interface IFormError {
  errorPassword: boolean
}

interface IOnChange {
  setFormData: (val: (prevprops: IFormData) => IFormData) => void
}


const Register: FC<IFormData & IOnChange>  = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showPasswordConfirm: false,
  })
  const [errorForm, setErrorForm] = useState<IFormError>({
    errorPassword: false
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormData = (prop: keyof IFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setFormData({
      ...formData,
      showPasswordConfirm: !formData.showPasswordConfirm,
    });
  };

  const navigateLoginPage = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorForm((prevProps) => {
        return {
          ...prevProps,
          errorPassword: true
        }
      })
      return
    }
    setErrorForm((prevProps) => {
      return {
        ...prevProps,
        errorPassword: false
      }
    })
    const copyFormData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    }
    createUser(copyFormData)
      .then(res => {
        console.log(res);
        if(res.status !== 400) {
          if (res.data.message) {
            alert('Cykas')
            return;
          }
          dispatch(actionUser(res.data))
          localStorage.setItem('user', JSON.stringify(res.data))
          return navigate('/chat')
        }
        alert('Cykas')
      })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container__login">
      <h2>Register</h2>
      <div className="wrapper__login">
        <div style={{ width: '100%' }}>
          <TextField
            id="outlined-basic"
            label="FirstName"
            variant="outlined"
            required
            type='text'
            value={formData.firstName}
            onChange={handleFormData('firstName')} 
            style={{ width: '100%' }} 
          />
            
        </div>
        <div style={{ width: '100%', marginTop: 12  }}>
          <TextField
            id="outlined-basic"
            label="LastName"
            variant="outlined"
            required
            type='text'
            value={formData.lastName}
            onChange={handleFormData('lastName')} 
            style={{ width: '100%' }} 
          />
            
        </div>
        <div style={{ width: '100%', marginTop: 12 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            type='email'
            variant="outlined"
            required
            value={formData.email}
            onChange={handleFormData('email')} 
            style={{ width: '100%'}} 
          />
            
        </div>
        <div>
          <FormControl sx={{ m: 1 }} variant="outlined" style={{ width: '100%', margin: '12px 0 0 0'}}>
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
        <div>
          <FormControl sx={{ m: 1 }} variant="outlined" style={{ width: '100%', margin: '12px 0' }}>
            <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              error={errorForm && errorForm.errorPassword}
              type={formData.showPasswordConfirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleFormData('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formData.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm password"
            />
          </FormControl>
        </div>
        <Button variant="contained" sx={{mr: '8px'}} onClick={() => handleRegister()}>Register</Button>
        <Button color="secondary" variant="outlined" onClick={navigateLoginPage}>Login</Button>
        {/* <button onClick={() => login()}>Login with google</button> */}
      </div>
    </div>
  )
}

export default Register