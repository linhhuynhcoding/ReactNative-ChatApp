import { conversationApi } from "@/apis/conversation"
import { useQuery } from "@tanstack/react-query"


export const useConversations = () => {
     return useQuery({
          queryKey: ["conversations"],
          queryFn: () => conversationApi.getConversations(),
          staleTime: 0, 
          refetchOnMount: true,
     })
}


export const useConversation = (conversationId: number) => {
     return useQuery({
          queryKey: ["get-conversation", conversationId],
          queryFn: () => conversationApi.getConversation(conversationId),
          staleTime: 0, 
          refetchOnMount: true,
     })
}

