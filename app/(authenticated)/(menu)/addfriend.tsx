import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const Addfriend = () => {

  const mailRef = useRef<TextInput>(null);
  const [mail, setMail] = useState("");


  return (
    <View className='flex-1 bg-white'>
      <View className='flex flex-row justify-between border border-gray-200 p-4 items-center gap-2'>
        <View className='flex-1'>
          <TextInput ref={mailRef} className='border border-gray-400 rounded-[10px] pl-4' placeholder='Nhập email bạn muốn tìm'
            placeholderTextColor={"gray"} 
            onChangeText={(value) => setMail(value)}
          >
          </TextInput>
        </View>
        <TouchableOpacity onPress={() => { }} disabled={!mail} className={`${!mail ? "opacity-40" : ""} bg-primary w-[30px] h-[30px] rounded-[25px] justify-center items-center`}>
          <FontAwesome5 name="arrow-right" size={12} color="white"  />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Addfriend