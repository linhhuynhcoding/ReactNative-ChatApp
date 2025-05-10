import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { EvilIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useGetFriendList } from '@/queries/useFriend';
import Contact from '@/components/Contact';
import { useCreateGroupMutation } from '@/queries/useGroup';
import { CreateGroupBodyDTO } from '@/models/group.schemas';
import Toast from 'react-native-toast-message';

const AddGroup = () => {

  const { data, isLoading } = useGetFriendList();
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [name, setName] = useState("");
  const friends = useMemo(() => data?.payload?.friends ?? [], [data]);

  const useCreateGroup = useCreateGroupMutation();

  const handleCheck = ({ userId, status }: { userId: number, status: "check" | "uncheck" }) => {
    if (status === "check") {
      setCheckedList([...checkedList, userId]);
    }
    else {
      setCheckedList(checkedList.filter((v) => v !== userId));
    }
  }

  const handleCreateGroup = async () => {
    try {
      const body: CreateGroupBodyDTO = {
        avatarUrl: "",
        description: "",
        members: [...checkedList],
        name: name
      };

      console.log(body)

      const response = await useCreateGroup.mutateAsync(body);

      Toast.show({
        type: "success",
        text1: "Tạo nhóm thành công!"
      })
    } catch (error) {
      alert("Đã có lỗi xảy ra!")
    }
  }

  return (
    <View className='flex-1 bg-white'>
      <View className='flex flex-row justify-between p-4 items-center gap-2'>
        <View className='flex-1 flex-row items-center gap-4'>
          <TouchableOpacity>
            <Ionicons name="camera" size={24} color="gray" />
          </TouchableOpacity>
          <TextInput className='flex-1'
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "#0099FF",
            }}
            placeholder='Đặt tên nhóm'
            placeholderTextColor={"gray"}
            onChangeText={setName}
          >
          </TextInput>
        </View>
      </View>
      <View className='flex flex-row justify-between pl-4 pr-4 items-center gap-2'>
        <View className='flex-1 flex-row rounded-[8px] bg-gray-200 items-center pl-2'>
          <EvilIcons name="search" size={24} color="black" className='' />
          <TextInput className='w-full p-0' style={{
            padding: 6,
          }}
            placeholder='Tìm tên'
          ></TextInput>
        </View>
      </View>
      <View className='mt-4' style={{
        borderTopWidth: 0.5
      }}>
        {
          !isLoading &&
          friends?.map((friend: any) => {
            return <Contact isSelect={true} key={friend?.id} name={friend?.name} id={friend?.id} onCheck={handleCheck}>

            </Contact>
          })
        }
      </View>

      <TouchableOpacity
        onPress={handleCreateGroup}
        className={`${false ? "opacity-40" : ""} bg-primary w-[30px] h-[30px] rounded-[25px] justify-center items-center`}>
        <FontAwesome5 name="arrow-right" size={12} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default AddGroup