import { IUserReducer } from "../../utils/interfaces/interfaces"
import { AUTH } from "../types/types"

export const actionUser = (user: Omit<IUserReducer, 'password'> | Record<string, unknown>) => {
  return {
    type: AUTH,
    user
  }
}