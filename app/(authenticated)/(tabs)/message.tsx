import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Message from '@/components/Message'

const Page = () => {
  return (
    <View className='bg-white flex-1 '>
      <ScrollView>
        <Message isSeen={true}></Message>
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
        <Message></Message>
      </ScrollView>
    </View>
  )
}

export default Page