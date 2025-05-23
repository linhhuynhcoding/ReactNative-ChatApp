import { ConversationResType } from '@/models/conversation.schemas';
import { Message, MessagePacket } from '@/models/message.schema';
import { ParticipantType } from '@/models/shared/shared-participant.model';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface MessageStore {
     data: Message[];
     name: string;
     conversationId: number | null;
     updateMessage: (data: Message) => void;
     setMessage: (data: Message[]) => void;
     changeName: (name: string) => void;
     changeConversation: (id: number) => void;
}

export const useMessageStore = create<MessageStore>(set => ({
     data: [],
     name: "",
     conversationId: null,
     updateMessage: (data: Message) =>
          set((state: any) => {
               if (data.conversationId !== state.conversationId) {
                    Toast.show({
                         type: "info",
                         text1: "Bạn có tin nhắn mới",
                         text2: `${data?.sender?.name}: ${data?.content?.length < 20 ? data?.content : data?.content?.substring(0, 19) + ".."}`
                    })

                    return ({
                         data: [
                              ...state.data
                         ]
                    });
               }

               return ({
                    data: [
                         ...state.data,
                         data,
                    ]
               })
          })
     ,
     setMessage: (data: Message[]) => set((state: any) => ({
          data: data
     })),
     resetMessage: () => set((state: any) => ({
          data: []
     })),
     changeName: (name: string) => set((state: any) => ({
          name: name
     })),
     changeConversation: (id: number) => set((state: any) => ({
          conversationId: id
     })),
}));

interface ConversationStore {
     data: ConversationResType[];
     currentConversation: ConversationResType | null;
     setCurrentConver: (data: ConversationResType) => void;
     sort: () => void;
     updateMessage: (message: Message) => void;
     updateConversations: (data: ConversationResType[]) => void;
}

export const useConversationStore = create<ConversationStore>(set => ({
     /**
      * Dữ liệu tất cả cuộc trò chuyện
      * @type ConversationResType[]
      */
     data: [],
     /**
      * Dữ liệu cuộc trò chuyện hiện tại
      * @type ConversationResType
      */
     currentConversation: null,

     setCurrentConver: (data: ConversationResType) => (set((state: ConversationStore) => {
          console.log(data);
          
          return ({
               currentConversation: data
          })
     })),

     sort: () => (set((state: ConversationStore) => {
          const dataSorted = state.data.sort((A: ConversationResType, B: ConversationResType) => {
               return (A?.lastMessage?.createdAt ?? A?.createdAt) > (B?.lastMessage?.createdAt ?? B?.createdAt) ? -1 : 1;
          });

          return ({
               data: [...dataSorted]
          })
     })),

     updateMessage: (message: Message) => (set((state: ConversationStore) => {
          const dataUpdated = state.data;

          const indexConver: number = dataUpdated.findIndex((conve: ConversationResType) => (conve.id === message.conversationId));

          for (let i = indexConver; i >= 1; i--) {
               const temp = dataUpdated[i];
               dataUpdated[i] = dataUpdated[i - 1];
               dataUpdated[i - 1] = temp;
          }

          return ({
               data: [...dataUpdated]
          })
     })),

     updateConversations: (data: ConversationResType[]) => (set((state: ConversationStore) => {
          const userId = useUserInfoStore.getState().userId;

          const dateUpdated = data?.map((conver) => {
               const partner = conver?.participants?.filter((part: ParticipantType) => (part?.userId !== userId))?.[0];

               // console.log(partner)

               if (!conver.name) {
                    conver.name = partner?.user?.name;
               }

               return conver;
          })

          return ({
               data: [...dateUpdated]
          })
     })),
}))

interface UserInfoStore {
     userId: number | null;
     setUserId: (id: number) => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
     persist(
          (set) => ({
               userId: null,
               setUserId: (id: number) => set({ userId: id }),
          }),
          {
               name: 'user-info', // tên key lưu vào AsyncStorage
               storage: createJSONStorage(() => AsyncStorage),
          }
     )
)