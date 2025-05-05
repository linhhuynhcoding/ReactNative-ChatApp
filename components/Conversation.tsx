import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { calculateTime } from '@/lib/utils'
import { Link, useRouter } from 'expo-router'

interface MessageProps {
     id: number;
     name?: string;
     imageUrl?: string;
     time?: string;
     message?: string;
     isActive?: boolean;
     isSeen?: boolean;
     isMuted?: boolean;
}

const Conversation = ({ id, isActive = false, isSeen = false, isMuted = false, name, message, time }: MessageProps) => {
     const router = useRouter();

     const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;
     const lastTime = calculateTime(time ?? "2023-10-01T12:00:00Z")


     return (
          <TouchableOpacity
               onPress={() => {
                    router.navigate({
                         pathname: `/(authenticated)/conversation/[id]`,
                         params: { id: id, name: name},
                    })
               }}
               activeOpacity={0.6} className='h-[80px] flex-row p-[10px] pl-6 border-b border-gray-200 gap-6'>

               <View className='w-[60px] h-[60px] rounded-[30px] overflow-hidden'>
                    <Image
                         style={styles.image}

                         source={avatarUrl}
                         // source="https://picsum.photos/seed/696/3000/2000"
                         contentFit="cover"
                         transition={1000}
                    />
               </View>
               <View className='flex-1 justify-center'>
                    <View className='flex-row '>
                         <Text className='flex-1 text-black self-stretch text-xl'>{name ?? "Huỳnh Vũ Nhật Linh"}</Text>
                         <View className='w-[70px] self-stretch flex-row gap-1 flex-1'>
                              {
                                   isMuted ? <MaterialIcons name="notifications-off" size={16} color="gray" /> : null
                              }
                              <Text numberOfLines={1} className='flex-1 text-gray-400 text-sm w-fit text-right pr-2'>
                                   {lastTime}
                              </Text>
                         </View>

                    </View>
                    <View >
                         <Text numberOfLines={2} className={`${isSeen ? 'text-gray-800 font-semibold' : 'text-gray-400 font-light'} truncate`}>
                              {message}
                         </Text>
                    </View>
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

export default Conversation