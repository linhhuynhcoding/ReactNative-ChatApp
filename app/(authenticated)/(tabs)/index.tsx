import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Conversation from '@/components/Conversation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useConversation } from '@/queries/useConversation'
import { useAppContext } from '@/context/AppContext'
import { Link, useRouter } from 'expo-router'

const Page = () => {
  const router = useRouter();

  const { account, isAuth } = useAppContext();
  const [token, setToken] = React.useState<string>("");

  const { data } = useConversation();
  const conversations = useMemo(() => {
    let result = data?.payload ?? [];

    result = result?.map((item: any) => {
      if (!item.isGroup && item) {
        item.participants = item.participants?.filter((participant: any) => participant.userId !== account.id);
        item.name = item.participants?.[0]?.user?.name;
      }

      return item;
    }).sort((a: any, b: any) => {
      console.log(a?.lastMessage?.createdAt, b?.lastMessage?.createdAt)
      return (a?.lastMessage?.createdAt < b?.lastMessage?.createdAt ? 1 : -1)
    });

    // console.log("conversations", result);

    return result;
  }, [data]);

  // useEffect(() => {
  //   if (!isAuth) {
  //     router.replace("/");
  //   }
  // }, [])

  return (
    <View className='bg-white flex-1 '>
      <ScrollView>
        {
          conversations.map((conversation: any) => {
            return (

              <Conversation
                key={conversation.id}
                id={conversation.id}
                name={conversation?.name}
                imageUrl={conversation.imageUrl}
                message={`${conversation.lastMessage?.senderId === account.id ? "Bạn: " : ""}` + (conversation?.lastMessage?.content ?? '')}
                time={conversation?.lastMessage?.createdAt}
              ></Conversation>

            )
          })
        }

        {/* <Message isSeen={true}></Message>
        <Message isSeen={true}></Message>
        <Message isSeen={true}></Message>
        <Message isMuted={true}></Message>
        <Message isSeen={true} isMuted={true}></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message> */}
      </ScrollView>
    </View>
  )
}

export default Page