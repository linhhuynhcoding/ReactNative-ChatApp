import { friendApi } from "@/apis/friend";
import { useMutation } from "@tanstack/react-query"

export const useSentFriendRequestMutation = () => {
     return useMutation({
          mutationFn: friendApi.sendRequest,          
     });
} 