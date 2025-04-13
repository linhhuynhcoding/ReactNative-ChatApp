import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const Message = ({ isActive = false, isSeen = false, isMuted = false }: { isActive?: boolean, isSeen?: boolean, isMuted?: boolean }) => {
     return (
          <TouchableOpacity activeOpacity={0.6} className='h-[80px] flex-row p-[10px] pl-6 border-b border-gray-200 gap-6'>
               <View className='w-[60px] h-[60px] rounded-[30px] overflow-hidden'>
                    <Image
                         style={styles.image}

                         source="https://picsum.photos/seed/696/3000/2000"
                         contentFit="cover"
                         transition={1000}
                    />
               </View>
               <View className='flex-1 justify-center'>
                    <View className='flex-row '>
                         <Text className='flex-1 text-black self-stretch text-xl'>Huỳnh Vũ Nhật Linh</Text>
                         <View className='w-[70px] self-stretch flex-row gap-1'>
                              {
                                   isMuted ? <MaterialIcons name="notifications-off" size={16} color="gray" /> : null
                              }                              
                              <Text numberOfLines={1} className='flex-1 text-gray-400 text-sm w-fit text-right pr-2'>5 phút</Text>
                         </View>

                    </View>
                    <View >
                         <Text numberOfLines={2} className={`${isSeen ? 'text-gray-800 font-semibold' : 'text-gray-400 font-light'} truncate`}>Thiên lý ơi em có thể ở lại đây không biết chăng ngoài trời mưa giông nhiều cô đơn lắm em,mmmmmmmmmmmmmmmmmmm</Text>
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

export default Message