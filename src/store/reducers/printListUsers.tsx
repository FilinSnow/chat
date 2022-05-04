const initialState = {
  users: []  
}

export const printListUsers = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_USER_PRINT":
      return {
        ...state,
        user: [...state.users, action.payload]
      }
    default: return { ...state };
  }
}