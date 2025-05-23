import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

const OptionLayout = () => {
     return (
          <Stack
          >
               <Stack.Screen
                    name='index'
                    options={{
                         header: () => <Header isSearch={false} tittle='Tùy chọn' />,

                    }}
               ></Stack.Screen>
               
               <Stack.Screen
                    name='add-member'
                    options={{
                         header: () => <Header isSearch={false} tittle='Thêm thành viên' />,
                    }}
               ></Stack.Screen>

               <Stack.Screen
                    name='delete-member'
                    options={{
                         header: () => <Header isSearch={false} tittle='Xóa thành viên' />,
                    }}
               ></Stack.Screen>
          </Stack>
     )
}

export default OptionLayout