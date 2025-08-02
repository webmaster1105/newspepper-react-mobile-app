import { useFocusEffect } from 'expo-router';
import React, { useRef } from 'react';
import { FlatList, FlatListProps, View } from 'react-native';

type Props<T> = {
  data: T[];
  isLoading: boolean;
  ref:any;
  index:number
} & FlatListProps<T>;

function NewsScrollList<T>({ data, isLoading, ref ,index = 0, renderItem, ...props }: Props<T>) {
  
  const flatListRef = useRef(null);


  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: false, index });
  };


   useFocusEffect(() => {
      if(index)scrollToIndex(index)
  
    });

  if (isLoading) {
    return <><View className="bg-gray-500 opacity-30 w-full h-[360] mb-4 animate-pulse" ></View>
                    <View className="bg-gray-500 opacity-30 mx-4 h-[10] animate-pulse"></View>
                    <View className="bg-gray-500 opacity-30 mx-4 h-[10] w-3/4 my-2 animate-pulse"></View>
                    <View className="bg-gray-500 opacity-30 mx-4 h-[150] my-2 animate-pulse"></View>
                  </>
  }

  return (
    <FlatList
    ref={flatListRef}
      data={data}
      renderItem={renderItem}
      {...props}
    />
  );
}

export default NewsScrollList;
