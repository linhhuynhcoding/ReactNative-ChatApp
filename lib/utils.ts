import { Message, MessageBlock } from "@/models/message.schema"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAccessToken = async () => {
     try {
          const token = await AsyncStorage.getItem("access_token")
          if (token) {
               return token
          } else {
               console.log("🚀 ~ getAccessToken ~ token: NOT FOUND", token)
          }
     } catch (error) {
          console.error("Error retrieving token:", error)
     }
}

export const calculateTime = (time: string | Date) => {
     const date = time instanceof Date ? time : new Date(time)
     const now = new Date()
     const diff = Math.abs(now.getTime() - date.getTime())

     const seconds = Math.floor(diff / 1000)
     const minutes = Math.floor(seconds / 60)
     const hours = Math.floor(minutes / 60)
     const days = Math.floor(hours / 24)

     if (days > 0) {
          return `${days} ngày trước`
     } else if (hours > 0) {
          return `${hours} giờ trước`
     } else if (minutes > 0) {
          return `${minutes} phút trước`
     } else {
          return `${seconds} giây trước`
     }
}

export const messageTime = (time: string) => {
     const date = new Date(time)
     const now = new Date()
     const diff = Math.abs(now.getTime() - date.getTime())

     const seconds = Math.floor(diff / 1000)
     const minutes = Math.floor(seconds / 60)
     const hours = Math.floor(minutes / 60)
     const days = Math.floor(hours / 24)

     if (days > 0) {
          return date.toLocaleDateString("vi-VN")
     } else {
          return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
     }
}

// Đảm bảo messages đã được sort theo thời gian
export const toBlockMessages = (messages: Message[]): MessageBlock[] => {
     const result: MessageBlock[] = [];
     let tempMessages: Message[] = [];

     for (const message of messages) {
          // Mảng tin nhắn rỗng thì tiếp tục
          if (!tempMessages.length) {
               tempMessages.push(message);
               continue;
          }

          const lastMessage = tempMessages[tempMessages.length - 1];
          
          // Nếu khác người gửi thì chuyển block
          if (message.senderId !== lastMessage?.senderId) {
               result.push({
                    senderId: lastMessage.sender.id,
                    senderName: lastMessage.sender.name,
                    senderAvt: lastMessage.sender.avatarUrl,
                    sentTime: lastMessage.createdAt,
                    messages: tempMessages
               })
               
               tempMessages = [];
          }
          
          tempMessages.push(message);
     }
     
     const lastMessage = tempMessages[tempMessages.length - 1];
     if (tempMessages.length !== 0) {
          result.push({
               senderId: lastMessage.sender.id,
               senderName: lastMessage.sender.name,
               senderAvt: lastMessage.sender.avatarUrl,
               sentTime: lastMessage.createdAt,
               messages: tempMessages
          })

          tempMessages = [];
     }


     return result;
}