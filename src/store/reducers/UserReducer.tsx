import axios from "axios";
import { store } from "../store";

interface IAction {
  type: string;
  data: any;
}

interface IState<T> {
  data: T;
  age: number;
  loading: boolean;
}

export const initialState = {
  user: {}
}

const UserReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'USER': {
      // console.log(action.data);
      
     
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

export const userAction = (data: any) => {
  // console.log(data);
  
  return {
    type: 'USER',
    data: data
  }
}

export default UserReducer;

