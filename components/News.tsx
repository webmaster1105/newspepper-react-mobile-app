import { getDomain, showTimeAgo } from '@/scripts/utilities';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import { ThemedText } from './ThemedText';

export function News({ news }: {
  news: any
}) {

  const { height } = useWindowDimensions();

  return (
    <View  style={{ height }}>
      {news.image && <Image source={{ uri: news.image.image }} className="h-[240]" style={[ {resizeMode: 'cover'}]}  /> }
      <View className="p-4">
        <ThemedText type="subtitle">{news.title}</ThemedText>

        <View className='my-4'>
        <Pressable  className='px-2 py-1 bg-blue-700 self-start'>
          <Text className='text-gray-50 '>{news.blog_category.category.name}</Text>
        </Pressable >
        </View>


        <ThemedText>{news.description}</ThemedText>

        

        {
          news.source_link &&

          <View className='flex-row my-4'>
          <Text className="dark:text-gray-100">{ showTimeAgo(news.created_at) +  " via "}

            <Link href={"/(tabs)/source?url="+news.source_link}>{ 
            
             getDomain(news.source_link)}</Link>
             {" | "}

             <Link href={"/(tabs)/source?url=https://newspepperapp.in/disclaimer"}>Disclaimer <Feather  name="info" /></Link>
          </Text>
          
          
          </View>



        }

      </View>

    </View>
  )

}

