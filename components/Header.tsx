import { View, Text, StatusBar, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import "./../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Link, router } from 'expo-router';

const Header = ({ path = "", isSearch = false, tittle }: { path?: string, tittle?: string, isSearch?: boolean }) => {
     console.log(path);

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
                                        <View className='w-auto flex-row self-stretch items-center gap-6 pr-4'>
                                             <MaterialIcons name="qr-code-scanner" size={20} color="white" />
                                             <AntDesign name="plus" size={24} color="white" />
                                        </View>
                                   </>
                                   :
                                   <Pressable onPress={() => router.back()} className='w-[50px] self-stretch justify-center items-center'>
                                        <MaterialIcons name="arrow-back" size={24} color="white" />
                                   </Pressable>
                         }
                         {
                              tittle ?
                                   <Text className='flex-1 justify-center p-2 text-xl text-white'>
                                        {tittle}
                                   </Text>
                                   : null
                         }


                    </View>
               </LinearGradient >
          </>

     )
}

export default Header