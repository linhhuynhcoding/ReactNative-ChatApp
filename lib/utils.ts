import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAccesstoken = async () => {
     try {
          const token = await AsyncStorage.getItem("access_token")
          if (token) {
               return token
          } else {
               throw new Error("Token not found")
          }
     } catch (error) {
          console.error("Error retrieving token:", error)
     }
}

export const calculateTime = (time: string) => {
     const date = new Date(time)
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