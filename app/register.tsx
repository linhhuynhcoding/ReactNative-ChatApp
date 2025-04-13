import { View, Text, TextInput, TouchableOpacity, Pressable, Button, } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRegisterMutation } from '@/queries/useAuth';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { storage } from '@/store/mmkv-storage';

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(true)

  const useRegister = useRegisterMutation();

  const changeVisable = () => {
    setShowPass(() => !showPass);
  }

  const handleRegister = async () => {
    try {
      const response = await useRegister.mutateAsync({ email, password: pass, confirmPassword: confirmPass, name });

      console.log(response);
      Toast.show({
        type: 'success',
        text1: "Đăng ký thành công"
      })

      router.push("/login");
    }
    catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: "Lỗi máy chủ"
      })
    }
  }

  return (
    <View className='flex-1'>
      <Text className='bg-gray-300 p-3 pl-4'>
        Vui lòng nhập số email và mật khẩu để đăng nhập
      </Text>
      <View className='flex p-3'>
        <TextInput className='border-b-2 border-sky-500 m-2 text-xl'
          placeholder='Tên của bạn'
          placeholderTextColor={"gray"}
          keyboardType='default'
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
        <TextInput className='border-b-2 border-sky-500 m-2 text-xl'
          placeholder='Email'
          placeholderTextColor={"gray"}
          keyboardType='default'
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
        <View className='flex-row justify-between border-b-2 border-sky-500 m-2 items-center'>
          <TextInput className='flex-1 text-xl'
            placeholder='Mật khẩu'
            placeholderTextColor={"gray"}
            keyboardType='default'
            secureTextEntry={showPass}
            value={pass}
            onChangeText={(text: string) => setPass(text)}
          >
          </TextInput>
          <Pressable onPress={() => changeVisable()} >
            <Text className='w-[50px] text-center text-gray-500 text-md font-bold'>
              {
                showPass ?
                  "HIỆN"
                  : "ẨN"
              }
            </Text>
          </Pressable>
        </View>
        <View className='flex-row justify-between border-b-2 border-sky-500 m-2 items-center'>
          <TextInput className='flex-1 text-xl'
            placeholder='Xác nhận mật khẩu'
            placeholderTextColor={"gray"}
            keyboardType='default'
            secureTextEntry={true}
            value={confirmPass}
            onChangeText={(text: string) => setConfirmPass(text)}
          >
          </TextInput>
        </View>

      </View>
      <View className='flex-1'></View>
      <View className='flex-row-reverse'>
        <TouchableOpacity onPress={() => handleRegister()} disabled={!(email && pass)} className={`m-8 ${!(email && pass) ? "opacity-40" : ""} bg-primary w-[50px] h-[50px] rounded-[25px] justify-center items-center`}>
          <FontAwesome5 name="arrow-right" size={18} color="white" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Page