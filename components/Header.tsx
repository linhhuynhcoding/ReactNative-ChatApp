import { View, Text, StatusBar, TextInput } from 'react-native'
import React from 'react'
import "./../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Header = ({path = ""} :{ path?: string}) => {
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
                         <View className='w-[50px] self-stretch justify-center items-center'>
                              <EvilIcons name="search" size={28} color="white" />
                         </View>
                         <View className='flex-1 self-stretch justify-center'>
                              <TextInput cursorColor={"#f9fafb"}
                                   className='p-2 text-xl text-white'
                                   placeholderTextColor={`#E0E0E0`}
                                   // style={{ padding: 30 }}
                                   placeholder="Tìm kiếm"
                              // onChangeText={newText => setText(newText)}
                              // defaultValue="Tìm cái gì đó..."
                              />
                         </View>
                         <View className='w-auto flex-row self-stretch items-center gap-6 pr-4'>
                              <MaterialIcons name="qr-code-scanner" size={20} color="white" />
                              <AntDesign name="plus" size={24} color="white" />
                         </View>
                    </View>
               </LinearGradient >
          </>

     )
}

export default Header