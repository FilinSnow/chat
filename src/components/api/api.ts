import axios from "axios";
import { IUserCreate, IUserLogin } from "../../utils/types/types";

const uri = 'exceed'; //exceed

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
      url: 'https://docker-chat-app.herokuapp.com/auth/login',
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
