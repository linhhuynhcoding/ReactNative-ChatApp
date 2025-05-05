import { http } from "@/lib/http";
import { UserResDTOType } from "@/models/shared/shared-user.model";

const AUTH_ENDPOINT = "/users";

export const userApi = {
     /**
      * Lấy thông tin người dùng
      * @param AccessToken (header)
      * @returns 
      */
     getMe: (token: string) => http.get<UserResDTOType>(`${AUTH_ENDPOINT}/me`, {
          headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`, 
          }
     }),
}