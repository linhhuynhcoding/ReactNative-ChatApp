import { MessagePacket } from "@/models/message.schema";
import { useMessageStore } from "@/store/zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { set } from "zod";

export class SocketService {
     private socket: Socket;

     constructor(token: string) {

          this.socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
               extraHeaders: {
                    Authorization: `Bearer ${token}`,
               }
          });
     }

     async getToken() {
          return AsyncStorage.getItem("access_token");
     }

     public bootstrap(updateMessage?: (message: MessagePacket) => void): void {
          console.log("SocketService bootstrap called");

          console.log("Socket URL:", process.env.EXPO_PUBLIC_SOCKET_URL);

          this.connectServer();
          // this.disconnectServer();
          this.newMessage(updateMessage);
          this.handleError();
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

     public newMessage(callback?: (message: MessagePacket) => void): void {
          console.log("Listening for new messages...");

          // const {data, updateMessage} = useMessaasfasfgeStore();

          this.socket.on("newMessage", (message: MessagePacket) => {
               console.log("New message received:", message);

               callback?.(message);
          });
     }

     public handleError() {
          this.socket.on("error", (message) => { 
               console.log(message);
               alert("Đã có lỗi xảy ra!")
          })
     }
}

export const bootstrap = (
     token: string,
     setSocket: (value: SocketService | null) => void,
     updateMessage: (message: MessagePacket) => void
) => {
     const socket = new SocketService(token);
     socket.bootstrap(updateMessage);
     setSocket(socket);
}