import { http } from "@/lib/http";

export const messageApi = {
     /**
      * Lấy tin nhắn
      * @param AccessToken (header)
      * @returns 
      */
     getMessages: (conversationId: number) => http.get<unknown>(`/conversations/${conversationId}/messages`, {
          headers: {
               "Content-Type": "application/json",
          },
          authorization: true,
     }),
} as const; 