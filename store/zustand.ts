import { MessagePacket } from '@/models/message.schema';
import { create } from 'zustand';


interface MessageStore {
     data: MessagePacket[];
     name: string;
     updateMessage: (data: MessagePacket) => void;
     replaceMessage: (data: MessagePacket[]) => void;
     changeName: (name: string) => void;
}

export const useMessageStore = create<MessageStore>(set => ({
     data: [],
     name: "",
     updateMessage: (data: MessagePacket) => set((state: any) => ({
          data: [
               ...state.data,
               data,
          ]
     })),
     replaceMessage: (data: MessagePacket[]) => set((state: any) => ({
          data: data
     })),
     changeName: (name: string) => set((state: any) => ({
          name: name
     })),
}));
