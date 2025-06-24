import { RootState } from '@/store';
import { fetchNewsNextPage } from '@/store/NewsSlice';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { News } from './News';

export function NewsScrollView({url,isFromHome,onRefresh}: {
  url:String
  isFromHome:boolean
  onRefresh:any
}) {

const [refreshing, setRefreshing] = useState(false);
  const news = useSelector((state: RootState) => state.news)

  const dispatch = useDispatch();

  const handleRefresh = useCallback(() => {
      setRefreshing(true);
      // fetchData(url);
  
      onRefresh();
  
      // Simulate fetching new data (e.g., from API)
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);


  return (

    <View >
   
      {!news.loading && <FlatList
        data={news.items}
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        // onScrollBeginDrag={onBeginScroll}
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
