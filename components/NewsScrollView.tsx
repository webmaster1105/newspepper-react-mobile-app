import { RootState } from '@/store';
import { fetchNewsNextPage } from '@/store/NewsSlice';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { News } from './News';

export function NewsScrollView({url,isFromHome}: {
  url:String
  isFromHome:boolean
}) {


  const news = useSelector((state: RootState) => state.news)

  const dispatch = useDispatch();


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
        // refreshControl={
        //   <RefreshControl refreshing={refreshing}
        //     onRefresh={onRefresh}
        //   />
        // }
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
