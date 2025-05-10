import { groupApi } from "@/apis/group"
import { CreateGroupBodyDTO } from "@/models/group.schemas"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateGroupMutation = () => {
     return useMutation({
          mutationFn: (body: CreateGroupBodyDTO) => groupApi.createGroup(body),
     })
}