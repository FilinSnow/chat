import axios from "axios";
import { store } from "../store";
import { userAction } from "./UserReducer";

interface IAction {
  type: string;
  data: string | number;
}

export const initialState = {
  auth: false
}

const AuthReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'AUTH': { 
      return {
        ...state,
      }
    }
    default:
      return {
        ...state
      }
  }
}


export const getUserThunk = () => { 
  return (dispatch: any) => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {    
        dispatch({type: 'AUTH', data: res})
        dispatch(userAction(res))
      }).catch(e => {
        throw new Error(e)
      })
    // dispatch()
  }
}

export default AuthReducer;

