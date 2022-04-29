import { IAction } from "../../utils/interfaces/interfaces"



export const initialState = {
  user: {}
}

const UserReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'USER': {
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
  return {
    type: 'USER',
    data: data
  }
}

export default UserReducer;

