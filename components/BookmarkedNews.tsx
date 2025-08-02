import { SavedNews } from '@/scripts/SavedNews';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import { InlineNews } from './InlineNews';
import Newslist from './NewsList';

export function BookmarkedNews() {


      const [loading, setLoading] = useState(true);
      const [bookmarkedNews, setBookmarkedNews] = useState<any[]>([])

      const getSavedNews = async () => {
            const news = await SavedNews.getList()
            setBookmarkedNews(news)
      }





useFocusEffect(

    useCallback(() => {

      getSavedNews()
            setLoading(false);

      
      return () => null;
    

    }, [])
  );

      return (

            <Newslist
                  data={bookmarkedNews} isLoading={loading} keyExtractor={(item) => item.id}
                  pagingEnabled
                  decelerationRate="fast"
                  snapToAlignment="start"
                  showsVerticalScrollIndicator={false}
                  className='p-4 mb-11'
                  refreshControl={
                        <RefreshControl
                              onRefresh={() => getSavedNews()} refreshing={false} />
                  }
                  renderItem={({ item,index }) => (
                  <Pressable onPress={() => router.push({
                                  pathname: "/(tabs)/SavedNewsScrollList",
                                  params: { index: index }
                                })
                                }>
                  <InlineNews news={item} />
                  </Pressable>
            )}

            />

      )
}
