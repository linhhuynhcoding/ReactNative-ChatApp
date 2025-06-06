import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import Header from '@/components/Header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/* <Tabs.Screen
        name="index"
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          title: 'Tìm tiếm',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          title: 'Tin nhắn',
          tabBarIcon: ({ color }) => (<AntDesign name="message1" size={28} color={color} />),
          headerShown: true,
          header: () => (<Header isSearch={true}></Header>),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          title: 'Danh bạ',
          tabBarIcon: ({ color }) => (<AntDesign name="contacts" size={28} color={color} />),
          headerShown: true,
          header: () => (<Header isSearch={true}></Header>),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          title: 'Cá nhân',
          tabBarIcon: ({ color }) => <Octicons name="person" size={28} color={color} />,
          headerShown: true,
          header: () => (<Header isSearch={false} isBack={false} setting={true}></Header>),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarStyle: {
    paddingBottom: 10,
  }
});