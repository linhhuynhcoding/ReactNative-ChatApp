import { http } from "@/lib/http";
import { CreateGroupBodyDTO } from "@/models/group.schemas";

const GROUP_ENDPOINT = "/groups";


export const groupApi = {
     
     createGroup: (body: CreateGroupBodyDTO) => http.post<unknown>(`${GROUP_ENDPOINT}`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          authorization: true
     }),


} as const;