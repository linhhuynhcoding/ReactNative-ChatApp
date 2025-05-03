import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useMessage } from '@/queries/useMessage';
import Message from '@/components/Message';
import { useAppContext } from '@/context/AppContext';

const Conversation = () => {
  const { id } = useLocalSearchParams();
  const { account } = useAppContext();
  const { data, isLoading } = useMessage(Number(id));
  const messages = useMemo(() => {
    console.log('data', data)

    return data?.payload ?? []
  }, [data]);

  return (
    <View className='bg-blue-50 flex flex-col flex-1 justify-start items-center'>
      {/* <Text>Conversation {id}</Text> */}
      <View className='flex-1 w-full'>
        <ScrollView className='flex gap-1'>
          {
            messages?.map((message: any, index: number) => {
              return (
                <Message name={message?.sender?.name} key={index} content={message?.content} isMine={account.id === message.senderId} ></Message>
              )
            })
          }
        </ScrollView>
      </View>
      <View className='flex flex-row items-center justify-between w-full bg-white'>
        <TextInput className='bg-white flex-1'>

        </TextInput>
        <MaterialIcons name="navigation" size={32} color="#3b82f6" className='p-2 rotate-90' />
      </View>
      <View className='w-full h-[30px] bg-white'>

      </View>
    </View>
  )
}

export default Conversation