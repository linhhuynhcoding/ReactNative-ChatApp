import { View, Text, StatusBar, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import "./../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { ExternalPathString, Href, Link, RelativePathString, router, useRouter } from 'expo-router';

import {
     Menu,
     MenuOptions,
     MenuOption,
     MenuTrigger,
} from 'react-native-popup-menu';
import { useMessageStore } from '@/store/zustand';

interface HeaderProps {
     path?: string;
     tittle?: string;
     isSearch?: boolean;
     isBack?: boolean;
     isChat?: boolean;
     setting?: boolean;
     backgroundColor?: string;
     backPath?: any;
}

const Header = ({ path = "", isSearch = false, tittle, isChat = false, backPath, isBack = true, setting = false }: HeaderProps) => {

     const router = useRouter();
     const { name } = useMessageStore();

     const nameRef = useRef<string>(name);

     useEffect(() => {
          nameRef.current = name;
     }, [name]);

     return (
          <>
               <StatusBar translucent
                    backgroundColor="transparent"
                    barStyle="light-content">
               </StatusBar>
               <LinearGradient
                    // Button Linear Gradient
                    colors={['#3b82f6', '#06b6d4']}
                    locations={[0.25, 1]}
                    start={[0, 0]}
                    end={[1, 1]}
               >
                    <View style={{ height: StatusBar.currentHeight }} className={`bg-black/10`}>
                    </View>
                    <View className='h-[50px] pl-2 pr-2 w-full flex-row justify-between grow items-center'>
                         {
                              isSearch &&
                              <>
                                   <View className='w-[50px] self-stretch justify-center items-center'>
                                        <EvilIcons name="search" size={28} color="white" />
                                   </View>
                                   <TouchableOpacity className='flex-1 self-stretch justify-center'>
                                        <Link href={"/search"} asChild>
                                             <Text
                                                  className='p-2 text-xl text-white'
                                             // onChangeText={newText => setText(newText)}
                                             // defaultValue="Tìm cái gì đó..."
                                             >Tìm kiếm</Text>
                                        </Link>
                                   </TouchableOpacity>
                                   <View className='flex-1'>

                                   </View>
                                   <View className='w-auto items-stretch  flex-row self-stretch items-center pr-4'>
                                        <View className='flex justify-center p-2'>
                                             <MaterialIcons name="qr-code-scanner" size={20} color="white" />
                                        </View>
                                        <View className='flex justify-center p-2'>
                                             <Menu>
                                                  <MenuTrigger >
                                                       <AntDesign name="plus" size={24} color="white" />
                                                  </MenuTrigger>
                                                  <MenuOptions customStyles={{
                                                       optionsContainer: {
                                                            padding: 2
                                                       }
                                                  }}>
                                                       <MenuOption onSelect={() => {
                                                            router.navigate("/(authenticated)/(menu)/addfriend")
                                                       }} >
                                                            <View className='flex flex-row pl-2 gap-4 items-center'>
                                                                 <AntDesign className='' name="adduser" size={24} color="black" />
                                                                 <Text style={{ padding: 2 }}>Thêm bạn</Text>
                                                            </View>
                                                       </MenuOption>
                                                       <MenuOption onSelect={() => {
                                                            router.navigate("/(authenticated)/(menu)/addgroup")
                                                       }} >
                                                            <View className='flex flex-row pl-2 gap-4 items-center'>
                                                                 <AntDesign name="addusergroup" size={24} color="black" />
                                                                 <Text style={{}}>Tạo nhóm</Text>
                                                            </View>
                                                       </MenuOption>
                                                  </MenuOptions>
                                             </Menu>
                                        </View>
                                   </View>
                              </>
                         }
                         {
                              (isBack && !isSearch) &&
                              <Pressable onPress={() => {
                                   if (backPath) {
                                        router.replace(backPath);
                                   } else {
                                        router.back()
                                   }
                              }} className='w-[50px] self-stretch justify-center items-center'>
                                   <MaterialIcons name="arrow-back" size={24} color="white" />
                              </Pressable>
                         }
                         {
                              tittle || isChat ?
                                   <Text className='flex-1 justify-center p-2 text-xl text-white'>
                                        {isChat ? nameRef.current : tittle}
                                   </Text>
                                   : null
                         }
                         {
                              setting &&
                              <>
                                   <View className='flex-1'></View>
                                   <Pressable 
                                   onPress={() => {
                                        router.push("/(authenticated)/setting")
                                   }}
                                   className='flex justify-center p-2'>
                                        <FontAwesome6 name="gear" size={20} color="white" />
                                   </Pressable>
                              </>

                         }
                    </View>
               </LinearGradient >
          </>

     )
}

export default Header