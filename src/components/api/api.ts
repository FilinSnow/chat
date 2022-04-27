import axios from "axios"
import { IUser } from "../../store/reducers/AuthReducer"

type IUserCreate = Omit<IUser, 'uid'>
type IUserLogin = Omit<IUser, 'uid' | 'firstName' | 'lastName'>

export const api = {
  createUser: async (user: IUserCreate) => {
   return await axios.request({
      url: 'https://docker-chat-app.herokuapp.com/auth/registration',
      method: 'post',
      data: user,
    })
  },

  loginUser: async (user: IUserLogin) => {
    return await axios.request({
      url: 'https://docker-chat-app.herokuapp.com/auth/authorization',
      method: 'post',
      data: user,
    })
  },

  getUser: async (url: string) => {
    return await axios.request({
      url: `https://docker-chat-app.herokuapp.com/google-auth/redirect/${url}`,
      method: 'get',
    })
  }
}