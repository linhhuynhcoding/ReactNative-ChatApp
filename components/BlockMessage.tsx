import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { MessageBlock } from '@/models/message.schema';
import Message from './Message';

interface BlockMessageProp {
     isMine?: boolean,
     data: MessageBlock
}

const BlockMessage: React.FC<BlockMessageProp> = ({ isMine = false, data }) => {
     const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${data.senderName}`;

     return (
          <View style={styles.block} className={` flex flex-row ${isMine ? "justify-end" : "justify-start"} shadow-md items-start`}>
               {
                    !isMine ?
                         <View style={styles.imageContainer} className=''>
                              <Image
                                   style={styles.image}

                                   source={avatarUrl}
                                   // source="https://picsum.photos/seed/696/3000/2000"
                                   contentFit="cover"
                                   transition={1000}
                              />
                         </View>
                         : null
               }
               <View className={`p-0 m-0 flex gap-1 ${isMine ? "items-end" : "items-start"}`}>

                    {
                         data.messages?.map((message, index) => {
                              return (
                                   <Message key={message.id} content={message.content} isMine={isMine} showName={index == 0}
                                        name={data.senderName} time={message.createdAt} showTime={index + 1 === data?.messages?.length}>
                                   </Message>
                              )
                         })
                    }
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     block: {
          marginBottom: 10,
          marginTop: 10,
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

export default BlockMessage