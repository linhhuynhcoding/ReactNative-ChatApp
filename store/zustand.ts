import { MessagePacket } from '@/models/message.schema';
import { create } from 'zustand';


interface MessageStore {
     data: MessagePacket[];
     updateMessage: (data: MessagePacket) => void;
     replaceMessage: (data: MessagePacket[]) => void;
}

export const useMessageStore = create<MessageStore>(set => ({
     data: [],
     updateMessage: (data: MessagePacket) => set((state: any) => ({
          data: [
               ...state.data,
               data,
          ]
     })),
     replaceMessage: (data: MessagePacket[]) => set((state: any) => ({
          data: data
     })),
}));