interface IFintCurrentUser {
  _id: string,
  user: string
}

interface IAction {
  type: string,
  payload: IFintCurrentUser[]
}

const initialState = {
  printUsers: []
}

export const PrintListUsers = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "GET_PRINT_USERS":
      return {
        ...state,
        printUsers: [...action.payload]
      }
    default:
      return { ...state }
  }
}