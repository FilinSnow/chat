import axios from "axios"
import { IUserCreate, IUserLogin } from "../../utils/types/types"

export const api = {
  createUser: async (user: IUserCreate) => {
    return await axios.request({
      url: 'https://exceed-chat-app.herokuapp.com/auth/registration',
      method: 'post',
      data: user,
    })
  },

  loginUser: async (user: IUserLogin) => {
    return await axios.request({
      url: 'https://exceed-chat-app.herokuapp.com/auth/login',
      method: 'post',
      data: user,
    })
  },

  getUser: async (url: string) => {
    return await axios.request({
      url: `https://exceed-chat-app.herokuapp.com/google-auth/redirect/${url}`,
      method: 'get',
    })
  },
  uploadFile: async (file: any) => {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    const { accessToken } = user
    const token = `Bearer ${accessToken}`
    console.log(file);

    try {
      return await axios.post(`https://exceed-chat-app.herokuapp.com/upload/voice`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
    } catch (error) {
      console.log(error);

    }
  }
}
