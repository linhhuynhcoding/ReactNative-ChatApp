import { CreateGroupBodyType } from "@/models/group.schemas";
import { Message, MessagePacket } from "@/models/message.schema";
import { useConversationStore, useMessageStore } from "@/store/zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { io, Socket } from "socket.io-client";
import { queryClient } from '@/components/query-provider';
import { Router, useRouter } from "expo-router";

export class SocketService {
     private socket: Socket;
     private router: Router;

     constructor(token: string) {

          this.socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
               extraHeaders: {
                    Authorization: `Bearer ${token}`,
               }
          });

          this.router = useRouter();
     }

     async getToken() {
          return AsyncStorage.getItem("access_token");
     }

     public bootstrap(updateMessage?: (message: Message) => void): void {
          console.log("SocketService bootstrap called");

          console.log("Socket URL:", process.env.EXPO_PUBLIC_SOCKET_URL);

          this.connectServer();
          // this.disconnectServer();
          this.newMessage(updateMessage);
          this.newGroup();
          this.handleError();
          this.friendRequestAccepted();
          this.friendRequestReceived();
          this.leaveGroup();
     }

     public connectServer(): void {
          console.log("Connecting to server...");
          this.socket.connect();
     }

     public disconnectServer(): void {
          console.log("Disconnecting from server...");
          this.socket.disconnect();
     }

     public sendMessage(messagePacket: MessagePacket): void {
          this.socket.emit("sendMessage", messagePacket);
     }

     public newMessage(callback?: (message: Message) => void): void {
          console.log("Listening for new messages...");
          const updateConversation = useConversationStore.getState().updateMessage;

          // const {data, updateMessage} = useMessaasfasfgeStore();

          this.socket.on("newMessage", (message: Message) => {
               console.log("New message received:", message);
               updateConversation(message);
               callback?.(message);
          });
     }

     public joinRoom(roomId: number, roomType: "group" | "conversation"): void {
          this.socket.emit("joinRoom", {
               roomId, roomType
          });

          queryClient.invalidateQueries({ queryKey: ["conversations"] })
     }

     public handleError() {
          this.socket.on("error", (message) => {
               console.log(message);
               alert("Đã có lỗi xảy ra!")
          })
     }

     public newGroup() {
          this.socket.on("newGroup", (data: {
               groupId: number, conversationId: number,
               groupName: string,
               admin: string
          }) => {
               Toast.show({
                    type: "info",
                    text1: `Bạn vừa được thêm vào nhóm ${data.groupName} bởi ${data.groupName}!`
               })

               return this.joinRoom(data.conversationId, "group");
          });
     }

     public addMember(groupId: number, memberId: number) {
          this.socket.emit("addMember", {
               groupId,
               memberId
          })

          queryClient.invalidateQueries({ queryKey: ["get-friends"] })
     }
     public deleteMember(groupId: number, memberId: number) {
          this.socket.emit("deleteMember", {
               groupId,
               memberId
          })

          queryClient.invalidateQueries({ queryKey: ["get-friends"] })
     }

     public createGroup(data: CreateGroupBodyType) {
          this.socket.emit("createGroup", data);

          queryClient.invalidateQueries({ queryKey: ["conversations"] })
     }

     // listen
     public friendRequestAccepted() {
          this.socket.on("friendRequestAccepted", (data) => {

               this.joinRoom(data.conversationId, 'conversation');

               queryClient.invalidateQueries({ queryKey: ["conversations"] })
          });
     }

     public sentFriendRequest(recipientEmail: string) {
          this.socket.emit("sendFriendRequest", {
               recipientEmail
          });
     }

     public acceptFriendRequest(requestId: number) {
          this.socket.emit("acceptFriendRequest", {
               requestId
          });

          queryClient.invalidateQueries({
               queryKey: ["get-friends"]
          })

          queryClient.invalidateQueries({ queryKey: ["conversations"] })
     }

     public rejectFriendRequest(requestId: number) {
          this.socket.emit("rejectFriendRequest", {
               requestId
          });

          queryClient.invalidateQueries({
               queryKey: ["get-friends"]
          })
     }

     // listen
     public friendRequestReceived() {
          this.socket.on("friendRequestReceived", (data) => {

               Toast.show({
                    type: "info",
                    text1: "Bạn có lời mời kết bạn mới!"
               })

               queryClient.invalidateQueries({ queryKey: ["get-friends"] })
          });
     }
     
     // listen
     public leaveGroup() {
          this.socket.on("leaveGroup", (data) => {

               Toast.show({
                    type: "info",
                    text1: "Bạn đã bị xóa khỏi group!"
               })

               queryClient.invalidateQueries({ queryKey: ["conversations"] })
               this.router.replace({
                    pathname: "/(authenticated)/(tabs)"
               })
          });
     }

}

export const bootstrap = (
     token: string,
     setSocket: (value: SocketService | null) => void,
     updateMessage: (message: Message) => void
) => {
     const socket = new SocketService(token);
     socket.bootstrap(updateMessage);
     setSocket(socket);
}