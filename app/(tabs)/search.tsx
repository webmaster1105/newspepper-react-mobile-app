import { InlineNews } from '@/components/InlineNews';
import NewsList from '@/components/NewsList';
import NoData from '@/components/NoData';
import SearchField from '@/components/SearchField';
import { ThemedText } from '@/components/ThemedText';
import { RootState } from '@/store';
import { fetchNews, fetchNewsNextPage } from '@/store/NewsSlice';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, RefreshControl, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const { t } = useTranslation();
  const { query } = useLocalSearchParams();
  const dispatch = useDispatch();

  const handleOnSearch = (q: string) => setSearchText(q)
  const [searchText, setSearchText] = useState(query || '');
  const news = useSelector((state: RootState) => state.news)
  const url = "https://newspepperapp.in/api/blogs?s=" + searchText

  useEffect(() => {

    dispatch(fetchNews(url))
  }, [searchText, query]);
  return (
    <SafeAreaProvider>

      <SafeAreaView className='p-4'>
        <SearchField onSearch={(q: string) => handleOnSearch(q)} value={searchText} />

        <ThemedText type="subtitle" className='mb-4 hidden'>{t('latest_news')}</ThemedText>
        <View className="p-4">

          <NewsList
            data={news.items} isLoading={news.loading}
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="start"
            showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) => (
              <Pressable onPress={() => router.push({
                pathname: "/(tabs)/(categories)/[id]",
                params: { id: 0, searchURL: url, index: index, fromHome: Math.random() }
              })
              }>
                <InlineNews news={item} />
              </Pressable>
            )}
            ListEmptyComponent={<NoData />}
            onEndReached={() => { if (news.nextPageUrl) dispatch(fetchNewsNextPage(news.nextPageUrl)) }}
            onEndReachedThreshold={0.6}
            keyExtractor={(item, index) => String(index)}

            refreshControl={
              <RefreshControl refreshing={false}
                onRefresh={() => dispatch(fetchNews(url))}
              />
            }


          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default Search