import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

const AuthLayout = () => {
     return (
          <Stack screenOptions={{
               headerShown: false
          }}>

               <Stack.Screen name='/(tabs)' options={{
                    headerShown: false
               }}>

               </Stack.Screen>

               <Stack.Screen name="conversation/[id]" options={{
                    header: () =>
                         (<Header isChat={true} backPath='(tabs)' ></Header>),
                    headerShown: true
               }} />

               <Stack.Screen
                    name="(menu)/addfriend"
                    options={{
                         header: () => <Header tittle='Thêm bạn'></Header>,
                         headerShown: true
                    }}
               >
               </Stack.Screen>

               <Stack.Screen
                    name="(menu)/addgroup"
                    options={{
                         header: () => <Header tittle='Tạo group'></Header>,
                         headerShown: true
                    }}
               >
               </Stack.Screen>


               <Stack.Screen
                    name="(profile)/[email]"
                    options={{
                         header: () => <Header></Header>,
                         headerShown: true
                    }}
               >
               </Stack.Screen>

          </Stack>
     )
}

export default AuthLayout