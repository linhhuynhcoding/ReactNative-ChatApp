import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRouter } from 'expo-router'
import { useAppContext } from '@/context/AppContext'
import { useConversationStore, useUserInfoStore } from '@/store/zustand'
import { useGroup } from '@/queries/useGroup'

const OptionPage = () => {
  const router = useRouter();
  const { socket } = useAppContext();
  const { userId } = useUserInfoStore();
  const { currentConversation } = useConversationStore();
  const isAdmin: boolean = useMemo(() => (currentConversation?.group?.adminId === userId), [currentConversation])

  useEffect(() => {
    console.log(currentConversation);
    console.log(userId);

  }, [currentConversation])
  const handleDeleteMember = async () => {
    if (!isAdmin) {
      return;
    }

    try {

    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }

  const handleLeaveGroup = async () => {
    if (!isAdmin) {
      return;
    }

    try {


    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }

  return (
    <View className='flex-1 bg-white'>
      {
        isAdmin &&
        <>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(authenticated)/conversation/options/add-member",
              })
            }}
            className='border border-b border-gray-200 h-[50px] p-2 justify-center pl-6'>
            <Text className='text-xl'>Thêm thành viên</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(authenticated)/conversation/options/delete-member",
              })
            }}
            className='border border-b border-gray-200 h-[50px] p-2 justify-center pl-6'>
            <Text className='text-xl'>Xóa thành viên</Text>
          </TouchableOpacity>
        </>
      }

      <View className='h-[100px]'>

      </View>
    </View>
  )
}

export default OptionPage