import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: process.env.API_URI
})

client.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('access')
      if (token) {
        config.headers.Authorization = "Bearer "+token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
)

export default client;



