import { View, Text, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'

import React from 'react'
import { useAppContext } from '@/context/AppContext';

const Page = () => {
  const { account } = useAppContext();
  const { name } = account;

  const avatarUrl = `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`;
  const coverUrl = `https://picsum.photos/seed/picsum/800/400`;

  return (
    <View className='bg-gray-100 flex-1'>

      <View className='bg-white flex h-[200px] border border-b border-gray-200 items-center'>
        <View
          style={styles.imageCoverContainer}
          className='absolute w-full'
        >
          <Image
            style={styles.imageCover}

            source={coverUrl}
            // source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
            transition={100}
          />
        </View>
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


      </View>
      {/* <ActivityIndicator size="large" /> */}
    </View>
  )

}

const styles = StyleSheet.create({
  imageCover: {
    flex: 1,
    width: '100%',
  },
  imageCoverContainer: {
    height: "100%",
    width: "100%",
    position: 'absolute',
    zIndex: 0,
    opacity: 0.8,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#055',
    borderRadius: 60,
    borderColor: "white",
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
export default Page