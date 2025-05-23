import { groupApi } from "@/apis/group"
import { CreateGroupBodyType } from "@/models/group.schemas"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/query-provider";

export const useCreateGroupMutation = () => {
     return useMutation({
          mutationFn: (body: CreateGroupBodyType) => groupApi.createGroup(body),
          onSuccess: () => {
               queryClient.invalidateQueries({
                    queryKey: ["conversations"]
               })
          }
     })
}

export const useGroup = (groupId: number) => {
     return useQuery({
          queryKey: ["group", groupId],
          queryFn: () => groupApi
     })
}