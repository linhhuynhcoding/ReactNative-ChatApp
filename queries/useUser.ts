import { userApi } from "@/apis/user"
import { useQuery } from "@tanstack/react-query"

export const useMe = (token: string) => {
     return useQuery({
          queryKey: ["me"],
          queryFn: () => userApi.getMe(token),
     })
}

export const useGetProfile = (email: string) => {
     return useQuery({
          queryKey: ["getProfile"],
          queryFn: () => userApi.findFriend(email)
     })
}