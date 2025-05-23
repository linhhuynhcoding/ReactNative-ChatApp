import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router/build/hooks';
import { useConversationStore, useUserInfoStore } from '@/store/zustand';
import Contact from '@/components/Contact';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppContext } from '@/context/AppContext';
import Toast from 'react-native-toast-message';
import { useGetFriendList } from '@/queries/useFriend';

const AddMember = () => {
     const router = useRouter();
     const { currentConversation } = useConversationStore();
     const { data, isLoading } = useGetFriendList();
     const { userId } = useUserInfoStore();
     const { socket } = useAppContext();

     const [checkedList, setCheckedList] = useState<number | null>();

     const friends = useMemo(() => data?.payload?.friends ?? [], [data]);
     const isAdmin: boolean = useMemo(() => (currentConversation?.group?.adminId === userId), [currentConversation])
     const memberIds: number[] = useMemo(() => currentConversation?.group?.members?.map(member => member.userId) ?? [], [currentConversation])

     const handleCheck = ({ userId, status }: { userId: number, status: "check" | "uncheck" }) => {
          if (status === "check") {
               console.log(userId);
               setCheckedList(userId);
          }
          else {
               setCheckedList(null);
          }
     }

     const handleAddMember = async () => {
          const groupId: number | undefined = currentConversation?.group?.id;
          if (!groupId || !checkedList) {
               return
          }

          try {
               socket?.addMember(groupId, checkedList);

               Toast.show({
                    type: "success",
                    text1: "Thêm thành viên thành công!"
               })

               router.back();
          } catch (error) {
               alert("Đã có lỗi xảy ra");
          }
     }
     return (
          <View>
               {
                    // currentConversation?.group?.members?.map((member) => {
                    //      if (member.userId === userId) return;
                    //      return <Contact isSelect={true} isSelected={member?.userId === checkedList} key={member?.userId} name={member?.user?.name} id={member?.userId} onCheck={handleCheck}>

                    //      </Contact>
                    // })
                    !isLoading &&
                    friends?.map((friend: any) => {
                         if (memberIds.includes(friend?.id)) return;
                         return <Contact isSelect={true} isSelected={checkedList} key={friend?.id} name={friend?.name} id={friend?.id} onCheck={handleCheck}>

                         </Contact>
                    })
               }
               <View className='flex-1'></View>
               <View className='items-end p-5'>
                    <TouchableOpacity
                         onPress={handleAddMember}
                         className={`${false ? "opacity-40" : ""}  bg-primary w-[30px] h-[30px] rounded-[25px] justify-center items-center`}>
                         <FontAwesome5 name="arrow-right" size={12} color="white" />
                    </TouchableOpacity>
               </View>
          </View>
     )
}

export default AddMember