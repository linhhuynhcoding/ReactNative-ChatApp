import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

const SettingLayout = () => {
     return (
          <Stack
               screenOptions={{
                    header: () => <Header isSearch={false} tittle='Tùy chọn' />
               }}
          />
     )
}

export default SettingLayout