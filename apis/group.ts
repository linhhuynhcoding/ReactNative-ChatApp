import { http } from "@/lib/http";
import { CreateGroupBodyType, GroupResType } from "@/models/group.schemas";

const GROUP_ENDPOINT = "/groups";


export const groupApi = {
     createGroup: (body: CreateGroupBodyType) => http.post<unknown>(`${GROUP_ENDPOINT}`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          authorization: true
     }),

     getGroup: (groupId: number) => http.get<GroupResType>(`${GROUP_ENDPOINT}/${groupId}`, {
          authorization: true
     })
} as const;