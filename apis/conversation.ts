import { http } from "@/lib/http";

const CONVERSATION_ENDPOINT = "/conversations";

export const conversationApi = {
     /**
      * Lấy tất cả cuộc trò chuyện
      * @param AccessToken (header)
      * @returns 
      */
     getConversations: () => http.get<unknown>(`${CONVERSATION_ENDPOINT}/all`, {
          headers: {
               "Content-Type": "application/json",
          },
          authorization: true,

     }),

     /**
      * Lấy cuộc trò chuyện
      * @param AccessToken (header)
      * @returns 
      */
     getConversation: ( conversationId: number ) => http.get<unknown>(`${CONVERSATION_ENDPOINT}?conversationId=${conversationId}`, {
          headers: {
               "Content-Type": "application/json",
          },
          authorization: true,
     }),



}