import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Conversation from '@/components/Conversation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useConversations } from '@/queries/useConversation'
import { useAppContext } from '@/context/AppContext'
import { Link, useRouter } from 'expo-router'
import { useConversationStore } from '@/store/zustand'
import Loading from '@/components/ActivityIndicator'
import { ConversationResType } from '@/models/conversation.schemas'

const Page = () => {

  const router = useRouter();
  const { account, isAuth } = useAppContext();
  const { data, isLoading } = useConversations();
  const { data: conversations, sort, updateConversations } = useConversationStore();

  useEffect(() => {

    if (!data) return;
    const { payload } = data!;

    updateConversations(payload);
    sort();
  }, [data])

  return (
    <View className='bg-white flex-1 '>
      <ScrollView>
        {
          !isLoading ?
          conversations.map((conversation: ConversationResType) => {
            return (
              <Conversation
                key={conversation.id}
                id={conversation.id}
                name={conversation?.name ?? ""}
                imageUrl={""}
                message={`${conversation.lastMessage?.senderId === account.id ? "Bạn: " : ""}` + (conversation?.lastMessage?.content ?? '')}
                time={conversation?.lastMessage?.createdAt ?? conversation?.createdAt}
                isGroup={conversation.isGroup}
              ></Conversation>
            )
          }) :
          <Loading></Loading>
        }
      </ScrollView>
    </View>
  )
}

export default Page