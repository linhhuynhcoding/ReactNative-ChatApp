import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useGetFriendList } from '@/queries/useFriend'
import Contact from '@/components/Contact';

const Page = () => {
  const { data, isLoading } = useGetFriendList();

  const friends = useMemo(() => data?.payload?.friends ?? [], [data]);
  const friendRequests = useMemo(() => data?.payload?.friendRequestsReceived ?? [], [data]);

  return (
    <View className='bg-white flex-1 flex '>
      {
        friendRequests.length > 0 &&
        <View className=''>

          <View className='p-2 border border-gray-100'>
            <Text className='font-bold'># Lời mời kết bạn</Text>
          </View>
          <View>
            {
              friendRequests?.map((request: any) => {
                return <Contact requestId={request?.id} isRequest={true} key={request?.requester?.id} name={request?.requester?.name} id={request?.requester?.id}>

                </Contact>
              })
            }
          </View>
        </View>
      }

      <View className=''>
        <View className='p-2 border border-gray-100'>
          <Text className='font-bold'># Bạn bè</Text>
        </View>
        <View>
          {
            !isLoading &&
            friends?.map((friend: any) => {
              return <Contact key={friend?.id} name={friend?.name} id={friend?.id}>

              </Contact>
            })
          }
        </View>
      </View>

    </View>
  )
}

export default Page