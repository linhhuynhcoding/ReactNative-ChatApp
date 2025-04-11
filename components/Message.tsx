import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

const Message = ({isActive = false}: {isActive?: boolean}) => {
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
                    <Text className='text-black text-xl'>Huỳnh Vũ Nhật Linh</Text>
                    <Text numberOfLines={2} className='text-gray-400 font-light truncate'>Thiên lý ơi em có thể ở lại đây không biết chăng ngoài trời mưa giông nhiều cô đơn lắm em,mmmmmmmmmmmmmmmmmmm</Text>

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