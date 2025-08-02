import { getDomain, showTimeAgo } from '@/scripts/utilities';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { SavedNews } from '@/scripts/SavedNews';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import ShareNews from './ShareNews';
import TextToSpeech from './TextToSpeech';
import { ThemedText } from './ThemedText';

export function News({ news }: {
  news: any
}) {

  const { height } = useWindowDimensions();

  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const bookmarked = async (id: number) => {
      const _bookmarked = await SavedNews.itemExists(id)
      setIsBookmarked(_bookmarked)
    }
    bookmarked(news.id)
  }, [news]);

  const saveNews = async (news: any) => {
    const isSaved = await SavedNews.addOrRemoveItem(news);
    setIsBookmarked(isSaved)

  }

  return (
    <View style={{ height }}>
      {news.image && <Image source={{ uri: news.image.image }} className="h-[40%]" style={[{ resizeMode: 'cover' }]} />}
      {!news.image && <View className="bg-gray-500 opacity-30 w-full h-[40%] mb-4 animate-pulse" >

      </View>}
      <View className="p-4">
        <ThemedText type="subtitle">{news.title}</ThemedText>

        <View className='my-4 flex-row justify-between'>
          <Pressable className='px-2 py-1 bg-blue-700 '>
            <Text className='text-gray-50 '>{news.blog_category.category.name}</Text>
          </Pressable >

          <View className='flex-row justify-between gap-2'>
            <TextToSpeech text={news.title + "\n" + news.description} />
            <Pressable className='px-2 py-1' onTouchEnd={() => saveNews(news)}>
              <Text className='dark:text-gray-100 '><FontAwesome name={isBookmarked ? "bookmark" : "bookmark-o"} size={20} /></Text>
            </Pressable >
            <ShareNews news={news} />

          </View>
        </View>


        <ThemedText>{news.description}</ThemedText>



        {
          news.source_link &&

          <View className='flex-row my-4'>
            <Text className="dark:text-gray-100">{showTimeAgo(news.created_at) + " via "}

              <Link href={"/(tabs)/source?url=" + news.source_link}>{

                getDomain(news.source_link)}</Link>
              {" | "}

              <Link href={"/(tabs)/source?url=https://newspepperapp.in/disclaimer"}>Disclaimer <Feather name="info" /></Link>
            </Text>


          </View>




        }



      </View>

    </View>
  )

}

