import AsyncStorage from "@react-native-async-storage/async-storage";
import defaultClient from "@/lib/api/defaultClient";


interface LoginType {
  id: string;
  password:string;
}

// eslint-disable-next-line import/prefer-default-export
export const login = async ({id,password}:LoginType) => {
    defaultClient.post(`auth/login`, {
          user_id: id,
          user_pw: password,
    }).then(res => {
        AsyncStorage.setItem('refresh', res.data.refreshToken).then(() => {
          defaultClient.get(`auth/refresh`, {
                headers: {
                  Cookie: `refreshToken=${res.data.refreshToken};`
                },
                withCredentials: true,
          }).then(res => {
              AsyncStorage.setItem('access', res.data.accessToken)
          }).catch(err => {
            Promise.reject(err);
          })
        }).catch(
        err => {
          Promise.reject(err);
        })
    }).catch(
      err => {
        Promise.reject(err);
      }
    )
};