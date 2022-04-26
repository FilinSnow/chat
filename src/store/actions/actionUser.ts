import { IUser } from "../reducers/AuthReducer"
import { AUTH } from "../types/types"

export const actionUser = (user: Omit<IUser, 'password'> | Record<string, unknown>) => {
  return {
    type: AUTH,
    user
  }
}