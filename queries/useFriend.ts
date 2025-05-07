import { friendApi } from "@/apis/friend";
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/query-provider";

export const useSentFriendRequestMutation = () => {
     return useMutation({
          mutationFn: friendApi.sendRequest,          
     });
} 


export const useResponseFriendRequestMutation = () => {
     return useMutation({
          mutationFn: friendApi.updateRequest,          
          onSuccess: () => {
               queryClient.invalidateQueries({
                    queryKey: ["get-friends"]
               })
          }
     });
} 

export const useGetFriendList = () => {
     return useQuery({
          queryKey: ['get-friends'],
          queryFn: () => friendApi.getFriendList(),
          staleTime: 0,
          refetchOnMount: true,
     })
}

