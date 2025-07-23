import { RootState } from '@/store';
import { fetchNewsNextPage } from '@/store/NewsSlice';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, RefreshControl, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { News } from './News';

export function NewsScrollView({ url, isFromHome, onRefresh, index }: {
  url: String
  isFromHome: boolean
  onRefresh: any
  index: number

}) {

  const [refreshing, setRefreshing] = useState(false);
  const news = useSelector((state: RootState) => state.news)
  const flatListRef = useRef(null);

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: false, index });
  };

  const { height } = useWindowDimensions();

  const dispatch = useDispatch();



  const handleRefresh = useCallback(() => {
    if (!index) {
    setRefreshing(true);
    // fetchData(url);

    onRefresh();

    // Simulate fetching new data (e.g., from API)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }}, [index]);

  useFocusEffect(() => {
    if(index)scrollToIndex(index)

  });


  return (

    <View>

      {!news.loading && <FlatList
        data={news.items}
        ref={flatListRef}
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        // onScrollBeginDrag={onBeginScroll}
        getItemLayout={(data, index) => (
          { length: height, offset: height * index, index }
        )}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        onEndReached={() => { if (news.nextPageUrl) dispatch(fetchNewsNextPage(news.nextPageUrl)) }}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => String(index)}
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({ item, index }) => {
          return <News news={item} />
          // return <View className='h-screen' style={{backgroundColor: index%2 ? 'red' : 'green'}}></View>

        }
        } />
      }
      {
        news.loading && <><View className="bg-gray-500 opacity-30 w-full h-[200] mb-4 " ></View>
          <View className="bg-gray-500 opacity-30 mx-4 h-[10]"></View>
          <View className="bg-gray-500 opacity-30 mx-4 h-[10] w-3/4 my-2"></View>
          <View className="bg-gray-500 opacity-30 mx-4 h-[150] my-2"></View>
        </>}


    </View>

  )
}
