import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'

const Message = ({ content, isMine, name }: { content: string, isMine: boolean, name: string }) => {
     const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;

     return (

          <View className={`flex flex-row ${isMine ? "justify-end" : "justify-start"} shadow-md items-center `}>
               {
                    // !isMine ?
                    //      <View style={styles.imageContainer} className=''>
                    //           <Image
                    //                style={styles.image}

                    //                source={avatarUrl}
                    //                // source="https://picsum.photos/seed/696/3000/2000"
                    //                contentFit="cover"
                    //                transition={1000}
                    //           />
                    //      </View>
                    //      : null
               }
               <View style={styles.message} className='flex p-2 bg-white justify-start'>
                    <Text className={`${isMine ? 'text-right' : 'text-left'}`}>{content ?? Message}</Text>
                    <Text className='text-gray-400 text-sm w-fit text-left pr-2'>
                         12:00
                    </Text>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     message: {
          borderRadius: 10,
          minWidth: 100,
          maxWidth: '80%',
          margin: 5,
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