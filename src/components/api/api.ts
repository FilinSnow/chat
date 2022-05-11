import axios from "axios";
import { IUserCreate, IUserLogin } from "../../utils/types/types";

const url = process.env.REACT_APP_URL;

export const api = {
  createUser: async (user: IUserCreate) => {
   return await axios.request({
      url: `${url}/auth/registration`,
      method: 'post',
      data: user,
    })
  },

  loginUser: async (user: IUserLogin) => {
    return await axios.request({
      url: `${url}/auth/login`,
      method: 'post',
      data: user,
    })
  },

  getUser: async (path: string) => {
    return await axios.request({
      url: `${url}/google-auth/redirect/${path}`,
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
