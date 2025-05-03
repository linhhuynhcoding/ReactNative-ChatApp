import { messageApi } from "@/apis/message";
import { useQuery } from "@tanstack/react-query";

export const useMessage = (conversationId: number) => {
     return useQuery({
          queryKey: ["message"],
          queryFn: () => messageApi.getMessages(conversationId),
     });
}