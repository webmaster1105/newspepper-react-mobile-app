import { getDomain, showTimeAgo } from '@/scripts/utilities';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export function InlineNews({ news }: { news: any }) {
  return (

    
  <View className="flex flex-row mb-2  bg-white dark:bg-black shadow-sm">
    {news.image && <Image className="w-1/4 h-auto" source={{ uri: news.image.image }} />}

     {!news.image &&  <View className="bg-gray-300 opacity-70 w-1/4 h-[100] animate-pulse"></View>}

    <View className="pl-4 pr-2 pt-1 pb-2 w-3/4">
      <Text className="text-lg font-medium">{news.title}</Text>




      {
        news.source_link &&

        <Pressable
          className="dark:text-gray-100 "
          onTouchEnd={() => {
            router.push(
              {
                pathname: "/(tabs)/(news)/source",
                params: {
                  url: news.source_link
                }
              }
            );
          }}

        >
            <Text className='text-sm'>{showTimeAgo(news.created_at) + " | " + getDomain(news.source_link)}</Text>

        </Pressable>



      }

    </View>

  </View>

  )
}
