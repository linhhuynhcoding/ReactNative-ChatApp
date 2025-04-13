import { http } from "@/lib/http";
import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from "@/models/auth.schemas";

const AUTH_ENDPOINT = "/auth";

export const authApi = {
     /**
      * Đăng nhập
      * @param (body) LoginBodyType Email và Password
      * @returns 
      */
     login: (body: LoginBodyType) => http.post<LoginResType>(`${AUTH_ENDPOINT}/login`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
     }),

     /**
      * Đăng ký
      * @param (body) RegisterBodyType Email, Name, Password, Confirm password
      * @returns 
      */
     register: (body: RegisterBodyType) => http.post<RegisterResType>(`${AUTH_ENDPOINT}/register`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
     }),
}