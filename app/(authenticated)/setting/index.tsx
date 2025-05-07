import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRouter } from 'expo-router'
import { useAppContext } from '@/context/AppContext'
import { StackActions } from '@react-navigation/native'

const SettingPage = () => {
  const router = useRouter();
  const {setSocket, setAccount, setAuth} = useAppContext();
     const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("access_token", "");

      setSocket(null);
      setAuth(false);

      router.replace("/initial-route");

    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }

  return (
    <View className='flex-1 bg-white'>


      <TouchableOpacity
        onPress={handleLogout}
        className='border border-b border-gray-200 h-[50px] p-2 justify-center pl-6'>
        <Text className='text-red-900 font-bold text-xl'>Đăng xuất</Text>
      </TouchableOpacity>

      <View className='h-[100px]'>

      </View>
    </View>
  )
}

export default SettingPage