import { View, Text, TextInput, TouchableOpacity, Pressable, Button, } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const Page = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [showPass, setShowPass] = useState(true)

  const changeVisable = () => {
    setShowPass(() => !showPass);
  }

  return (
    <View className='flex-1'>
      <Text className='bg-gray-300 p-3 pl-4'>
        Vui lòng nhập số email và mật khẩu để đăng nhập
      </Text>
      <View className='flex p-3'>
        <TextInput className='border-b-2 border-sky-500 m-2 text-xl'
          placeholder='Số điện thoại'
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

      </View>
      <View className='flex-1'></View>
      <View className='flex-row-reverse'>
        <TouchableOpacity className='m-8 bg-primary w-[50px] h-[50px] rounded-[25px] justify-center items-center'>
          <FontAwesome5 name="arrow-right" size={18} color="white" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Page