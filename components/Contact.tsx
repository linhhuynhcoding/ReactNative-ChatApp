import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useResponseFriendRequestMutation } from '@/queries/useFriend'

const Contact = ({ id, name, imageUrl, isRequest = false, requestId }: { id: number, name: string, imageUrl?: string, isRequest?: boolean, requestId?: number }) => {
     const router = useRouter();
     const useResponseRequest = useResponseFriendRequestMutation();

     const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;


     const handleResponseRequest = async (value: "rejected" | "accepted") => {
          if (!requestId) return;
          try {
               const response = await useResponseRequest.mutateAsync({
                    body: { status: value },
                    id: requestId
               })

          } catch (error) {
               alert("Đã có lỗi xảy ra");
          }
          router.reload();
     }

     return (

          <TouchableOpacity
               onPress={() => {
                    if (isRequest) return;
                    router.navigate({
                         pathname: `/(authenticated)/conversation/[id]`,
                         params: { id: id, name: name },
                    })
               }}
               activeOpacity={0.6} className='h-[60px] flex-row p-[10px] pl-6 gap-6'>

               <View className='w-[40px] h-[40px] rounded-[30px] overflow-hidden'>
                    <Image
                         style={styles.image}

                         source={avatarUrl}
                         // source="https://picsum.photos/seed/696/3000/2000"
                         contentFit="cover"
                         transition={1000}
                    />
               </View>

               <View className='flex-1 justify-between flex-row items-center'>
                    <View className='items-center'>
                         <Text className='flex-1 text-black self-stretch text-xl'>{name ?? "Huỳnh Vũ Nhật Linh"}</Text>
                    </View>
                    {
                         isRequest &&
                         <View className='flex-row justify-end bg-gray-20 gap-4 items-center'>
                              <Pressable onPress={() => handleResponseRequest("accepted")} style={{ backgroundColor: "#57FFBC", padding: 6, borderRadius: 6, }}>
                                   <Text className='font-thin ' style={{ color: "#119963" }}>Chấp nhận</Text>
                              </Pressable>
                              <Pressable onPress={() => handleResponseRequest("rejected")} style={{ backgroundColor: "#FF5E79", padding: 6, borderRadius: 6, }}>
                                   <Text className='font-thin ' style={{ color: "white" }}>Từ chối</Text>
                              </Pressable>
                         </View>
                    }
               </View>
          </TouchableOpacity>
     )
}

const styles = StyleSheet.create({

     image: {
          flex: 1,
          width: '100%',
          backgroundColor: '#0553',
     },
});

export default Contact