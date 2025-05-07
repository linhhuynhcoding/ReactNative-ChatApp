import { View, Text, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetProfile } from '@/queries/useUser';
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { useSentFriendRequestMutation } from '@/queries/useFriend';
import Toast from 'react-native-toast-message';

const Profile = () => {

     const router = useRouter();

     const { email, name } = useLocalSearchParams();
     const { data, error } = useGetProfile(email as string);
     const [sentRequest, setSentRequest] = useState(false);
     const useSentFriendRequest = useSentFriendRequestMutation();

     const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;

     const isFriend = useMemo(() => {
          const payload = data?.payload;

          if (data?.payload?.friendRequestsReceived?.length > 0) {
               setSentRequest(true);
          }

          if (payload?.friendOf?.length > 0 || payload?.friends?.length > 0) {
               return true;
          }
          else {
               return false;
          }

     }, [data]);

     useEffect(() => {
          if (error) {
               alert("Đã có lỗi xảy ra!");
          }
     }, [error])

     const handleSentFriendRequest = async () => {
          if (sentRequest) return;

          try {
               const response = await useSentFriendRequest.mutateAsync({
                    recipientEmail: email as string
               })

               setSentRequest(true);
          } catch (error) {
               alert("Đã có lỗi xảy ra")
          }
     }

     return (
          <View className='bg-gray-100 flex-1'>

               <View className='bg-white flex h-[200px] border border-b border-gray-200 items-center'>
                    <View
                         style={styles.imageContainer}
                    >
                         <Image
                              style={styles.image}

                              source={avatarUrl}
                              // source="https://picsum.photos/seed/696/3000/2000"
                              contentFit="cover"
                              transition={1000}
                         />
                    </View>
               </View>
               {/* TODO: refactor lai vi tri */}
               <View className='flex top-[6%]'>
                    <Text
                         style={styles.tittle}
                    >{name}</Text>

                    {
                         isFriend &&
                         <View className='pl-10 pr-10 pt-2'>
                              <TouchableOpacity
                                   onPress={() => {
                                        router.replace({
                                             pathname: "/(authenticated)/conversation/[id]",
                                             params: {
                                                  id: data?.payload?.id,
                                                  name: name,
                                             }
                                        })
                                   }}
                                   className='bg-[#C7EEFF] w-full p-3 rounded-[20px]'>
                                   <Text className='text-center text-[#1C8EFF] font-semibold'>Nhắn tin</Text>
                              </TouchableOpacity>
                         </View>
                    }
                    {
                         !isFriend &&
                         <View className='pl-10 pr-10 pt-2'>
                              <TouchableOpacity
                                   onPress={handleSentFriendRequest}
                                   activeOpacity={0.6}
                                   className='bg-white w-full p-3 rounded-[20px]'>
                                   <Text className='text-center font-semibold'>
                                        {
                                             sentRequest ?
                                                  "Đã gửi lời mời"
                                                  : "Kết bạn"
                                        }
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    }
               </View>
               {/* <ActivityIndicator size="large" /> */}
          </View>
     )
}

const styles = StyleSheet.create({

     image: {
          flex: 1,
          width: '100%',
          backgroundColor: '#055',
          borderRadius: 60,
          borderColor: "#0334",
          borderWidth: 4,
     },
     imageContainer: {
          width: 120,
          height: 120,
          bottom: "-25%",
          position: 'absolute',
     },
     tittle: {
          fontSize: 32,
          textAlign: "center",
     },
     button: {
          margin: 4
     }
});


export default Profile