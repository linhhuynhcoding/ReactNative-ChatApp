import { http } from "@/lib/http";
import { FindProfileResDTOType, UserResDTOType } from "@/models/shared/shared-user.model";

const USER_ENDPOINT = "/users";

export const userApi = {
     /**
      * Lấy thông tin người dùng
      * @param AccessToken (header)
      * @returns 
      */
     getMe: (token: string) => http.get<UserResDTOType>(`${USER_ENDPOINT}/me`, {
          headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
          }
     }),

     findFriend: (email: string) => http.get<FindProfileResDTOType>(`${USER_ENDPOINT}?email=${email}`, {
          headers: {
               "Content-Type": "application/json",
          },
          authorization: true
     }),
}