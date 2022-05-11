import axios from "axios";
import { api } from "../../components/api/api";
import { IAction, IUserReducer } from "../../utils/interfaces/interfaces";
import { actionUser } from "../actions/actionUser";
import { AUTH } from "../types/types";
import { userAction } from "./UserReducer";

export const initialState = {
  auth: false,
  user: {}
}

const AuthReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTH: {
      return {
        ...state,
        user: action.user 
      }
    }
    default:
      return {
        ...state
      }
  }
}

export const createUser = (user: Omit<IUserReducer, 'uid'>) => {
  return api.createUser(user)
    .then((res: any) => {
  
      
      return res
    })
    .catch(e => {
      return {
        status: 400
      }
    })
}

export const loginUser = (user: Omit<IUserReducer, 'firstName' | 'uid' | 'lastName'>) => {
  return (dispatch: any) => {
     api.loginUser(user)
      .then((res: any) => {
        if (res) {
          dispatch(actionUser(res.data))
          localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res
      })
      .catch(e => {
        return {
          status: 400
        }
      })
  }
}

export const getUser = (url: string) => {
  return (dispatch: any) => {
    api.getUser(url)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        dispatch(actionUser(res.data))
        return res;
      })
  }
}


export const getUserThunk = () => {
  return (dispatch: any) => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        dispatch({ type: 'AUTH', data: res })
        dispatch(userAction(res))
      }).catch(e => {
        throw new Error(e)
      })
  }
}

export default AuthReducer;

