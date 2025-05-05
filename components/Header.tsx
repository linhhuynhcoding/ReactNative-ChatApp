import { View, Text, StatusBar, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import "./../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Link, router } from 'expo-router';

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
     isChat?: boolean;
}

const Header = ({ path = "", isSearch = false, tittle, isChat = false }: HeaderProps) => {
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
                              isSearch ?
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
                                                            <MenuOption onSelect={() => alert(`Save`)} >
                                                                 <View className='flex flex-row pl-2 gap-4 items-center'>
                                                                      <AntDesign className='' name="adduser" size={24} color="black" />
                                                                      <Text style={{ padding: 2 }}>Thêm bạn</Text>
                                                                 </View>
                                                            </MenuOption>
                                                            <MenuOption onSelect={() => alert(`Delete`)} >
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
                                   :
                                   <Pressable onPress={() => router.back()} className='w-[50px] self-stretch justify-center items-center'>
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


                    </View>
               </LinearGradient >
          </>

     )
}

export default Header