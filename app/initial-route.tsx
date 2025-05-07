import { TouchableOpacity, View, Text } from "react-native";
import { Image } from "expo-image";
import { StyleSheet } from 'react-native'
import { useAssets } from 'expo-asset';
import { Link, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { getAccessToken } from "@/lib/utils";
import { useMessageStore } from "@/store/zustand";
import { bootstrap } from "@/services/socket.service";
import { userApi } from "@/apis/user";

export default function Page() {
     const router = useRouter();
     const [assets] = useAssets([require('@/assets/images/bg.png'), require('@/assets/images/ZolaBlue.png')]);
     const [showBg, setShowBg] = useState(true);
     const { isAuth, setAuth, setSocket, setAccount, socket } = useAppContext();
     const authRef = useRef(isAuth);
     const { updateMessage } = useMessageStore();

     useEffect(() => {
          authRef.current = isAuth
     }, [isAuth]);

     useEffect(() => {
          console.log("fire");
          
          setTimeout(() => {

               if (authRef.current) {
                    console.log("natigating... conversation")
                    // router.replace("/(authenticated)/(tabs)")

                    return;
               }

               getAccessToken().then(async (token) => {
                    console.log("🚀 ~ getAccessToken ~ token:", token)
                    
                    if (token !== "" && token) {
                         const { payload } = await userApi.getMe(token);
                         setAuth(true);
                         setAccount(payload);

                         if (!socket) {
                              bootstrap(token, setSocket, updateMessage);
                         }
                         // router.replace("/(authenticated)/(tabs)")
                    }
               });

               setShowBg(false);
          }, 2000)
     }, [])


     return (
          <View className="flex-1 justify-between items-center bg-white">
               {
                    showBg
                         ?
                         <Image
                              source={{ uri: assets?.[0]?.uri }}
                              style={styles.image}

                              contentFit="cover"
                              transition={1000}
                         >

                         </Image>
                         : <>
                              <View className="flex-2 w-full justify-center items-center">
                                   <Image
                                        source={{ uri: assets?.[1]?.uri }}
                                        style={{ width: "100%", height: 100 }}
                                        contentFit="contain"
                                   >
                                   </Image>
                              </View>
                              <View className="flex-2">
                              </View>
                              <View className="flex-1 w-full justify-end items-center pb-10 p-6 gap-4">
                                   <Link
                                        href={'/login'}
                                        className="bg-[#0070F0] rounded-3xl w-full flex items-center p-4"
                                        // style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]}
                                        asChild>
                                        <TouchableOpacity>
                                             <Text className="w-full text-center" style={{ color: 'white', fontSize: 18, fontWeight: '200' }}>
                                                  Đăng nhập
                                             </Text>
                                        </TouchableOpacity>
                                   </Link>
                                   <Link
                                        href={'/register'}
                                        className="bg-gray-200 rounded-3xl w-full flex items-center p-4"
                                        // style={[defaultStyles.pillButton, { flex: 1, backgroundColor: '#fff' }]}
                                        asChild>
                                        <TouchableOpacity>
                                             <Text className="w-full text-center" numberOfLines={1} style={{ fontSize: 18, fontWeight: '200' }}>Tạo tài khoản mới</Text>
                                        </TouchableOpacity>
                                   </Link>
                              </View>
                         </>
               }

          </View>
     )
}

const styles = StyleSheet.create({

     image: {
          width: '100%',
          height: '100%',
          backgroundColor: '#55555',
     },
});
