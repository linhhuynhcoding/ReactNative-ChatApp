import { authApi } from "@/apis/auth"
import { LoginBodyType } from "@/models/auth.schemas"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useLoginMutation = () => {
     return useMutation({
          mutationFn: authApi.login
     })
}

export const useRegisterMutation = () => {
     return useMutation({
          mutationFn: authApi.register
     })
}