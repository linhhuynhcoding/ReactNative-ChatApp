import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { messageTime } from '@/lib/utils'

interface MessageProp {
     content: string,
     isMine: boolean,
     name: string,
     time: string,
     showTime?: boolean,
     showName?: boolean,
}

const Message = ({ content, isMine, name, time, showTime = true, showName = false }: MessageProp) => {
     const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;

     return (
          <View style={styles.message} className={`flex flex-col m-0 p-2 bg-white ${isMine ? "justify-end" : "justify-start"}`}>
               {
                    (!isMine && showName) &&
                    <Text style={{
                         fontSize: 10,
                         color: "#CF1F48"
                    }} >{name}</Text>
               }
               <Text className={`${'text-left'}`}>{content ?? Message}</Text>
               {
                    showTime &&
                    <Text className='text-gray-400 text-sm w-fit text-left pr-2'>
                         {messageTime(time)}
                    </Text>
               }
          </View>
          // <View className={`flex flex-row ${isMine ? "justify-end" : "justify-start"} shadow-md items-center `}>


          // </View>
     )
}

const styles = StyleSheet.create({
     message: {
          borderRadius: 10,
          minWidth: 100,
          maxWidth: '80%',
          marginLeft: 5,
          marginRight: 5,
     },
     image: {
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#0553',
          borderRadius: 100,
     },
     imageContainer: {
          width: 20,
          height: 20,
          marginLeft: 10,

     }
});


export default Message