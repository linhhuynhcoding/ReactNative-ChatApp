import { View, Text, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useMessage } from '@/queries/useMessage';
import Message from '@/components/Message';
import { useAppContext } from '@/context/AppContext';
import { useMessageStore } from '@/store/zustand';

const Conversation = () => {
  const { id, name } = useLocalSearchParams();
  const { account, socket } = useAppContext();
  const { data, isLoading } = useMessage(Number(id));

  const [message, setMessage] = React.useState<string>("");
  const textInputRef = React.useRef<TextInput>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const { data: messageData, changeName, replaceMessage } = useMessageStore();

  const messages = useMemo(() => {
    console.log('data', data)

    return data?.payload?.sort((messageA: any, messageB: any) => {
      if (messageA?.createdAt < messageB?.createdAt) {
        return -1;
      }
      else {
        return 1;
      }
    }) ?? []

  }, [data]);

  useEffect(() => {
    console.log("messageData", messages);
    replaceMessage(messages);

  }, [messages])

  useEffect(() => {
    console.log({ id, name });
    changeName(name as string);
  }, [])

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    socket?.sendMessage({
      content: message,
      roomId: Number(id),
      roomType: "conversation",
    });

    textInputRef.current?.clear();
    setMessage("");
  }

  return (
    <View className='bg-blue-50 flex flex-col flex-1 justify-start items-center'>
      {/* <Text>Conversation {id}</Text> */}
      <View className='flex-1 w-full'>
        <ScrollView ref={scrollViewRef}
          onLayout={(event) => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }} className='flex gap-1'>
          {
            messageData?.map((message: any, index: number) => {
              return (
                <Message time={message.createdAt} name={message?.sender?.name} key={index} content={message?.content} isMine={account.id === message?.senderId} ></Message>
              )
            })
          }
        </ScrollView>
      </View>
      <View className='flex flex-row items-center justify-between w-full bg-white'>
        <TextInput ref={textInputRef} onChangeText={(text) => setMessage(text)} className='bg-white flex-1'>

        </TextInput>
        <Pressable onPress={() => handleSendMessage(message)}>
          <MaterialIcons name="navigation" size={32} color="#3b82f6" className='p-2 rotate-90' />
        </Pressable>
      </View>
      <View className='w-full h-[30px] bg-white'>

      </View>
    </View>
  )
}

export default Conversation