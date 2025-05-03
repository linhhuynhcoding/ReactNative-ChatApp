import { http } from "@/lib/http";

const CONVERSATION_ENDPOINT = "/conversations";

export const conversationApi = {
     /**
      * Lấy cuộc trò chuyện
      * @param AccessToken (header)
      * @returns 
      */
     getConversations: () => http.get<unknown>(`${CONVERSATION_ENDPOINT}`, {
          headers: {
               "Content-Type": "application/json",
          },
          authorization: true,

     }),

}