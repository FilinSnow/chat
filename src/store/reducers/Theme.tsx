interface ITheme {
  theme: string
}

interface IAction {
  type: string,
  payload: string
}

const initialState: ITheme = {
  theme: localStorage.getItem('theme') || 'light'
};

export const Theme = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload
      }
    default: return { ...state }
  }
}