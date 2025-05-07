import { http } from "@/lib/http";
import { CreateFriendRequestBodyType } from "@/models/friend.schema";

const FRIEND_REQUEST_ENDPOINT = "/friend-requests"

export const friendApi = {
     sendRequest: (body: CreateFriendRequestBodyType) => http.post<unknown>(`${FRIEND_REQUEST_ENDPOINT}`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          authorization: true
     }),

     getFriendList: () => http.get<unknown>('/users/friend-list', {
          headers: { "Content-Type": "application/json" },
          authorization: true
     }),

     updateRequest: ({ body, id }: { body: {
          status: 'accepted' | 'rejected'
     }, id: number }) => http.put<unknown>(`${FRIEND_REQUEST_ENDPOINT}/${id}`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          authorization: true
     })

} as const;