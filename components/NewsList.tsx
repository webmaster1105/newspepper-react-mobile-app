import React from 'react';
import { FlatList, FlatListProps, View } from 'react-native';

type Props<T> = {
  data: T[];
  isLoading: boolean;
  shimmerCount?: number;
} & FlatListProps<T>;

function NewsList<T>({ data, isLoading, shimmerCount = 6, renderItem, ...props }: Props<T>) {
  if (isLoading) {
    return (
      <View>
        {Array.from({ length: shimmerCount }).map((_, i) => (
          <View className="opacity-70 flex flex-row mb-4" key={i}>
                            <View className="bg-gray-300 opacity-70 w-1/4 h-[100] animate-pulse"></View>
                            <View className="opacity-70 mx-4 h-[100] w-3/4 animate-pulse">
                              <View className="bg-gray-300 opacity-70 mx-4 h-[10] my-2 "></View>
                              <View className="bg-gray-300 opacity-70 mx-4 h-[5] my-2"></View>
                              <View className="bg-gray-300 opacity-70 mx-4 h-[5] my-2"></View>
                              <View className="bg-gray-300 opacity-70 mx-4 h-[5] my-2"></View>
                            </View>
          
                          </View>
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      {...props}
    />
  );
}

export default NewsList;
