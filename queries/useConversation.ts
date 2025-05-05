import { conversationApi } from "@/apis/conversation"
import { useQuery } from "@tanstack/react-query"


export const useConversation = () => {
     return useQuery({
          queryKey: ["conversations"],
          queryFn: () => conversationApi.getConversations(),
          staleTime: 0, 
          refetchOnMount: true,
     })
}