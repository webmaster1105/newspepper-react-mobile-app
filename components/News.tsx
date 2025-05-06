import { getDomain, showTimeAgo } from '@/scripts/utilities';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function News({ news }: {
  news: any
}) {

  const tabBarHeight = useBottomTabBarHeight(); 

  return (
    <View style={{
                        // padding:20,
                                width:Dimensions.get("window").width, 
                                height: Dimensions.get("window").height - tabBarHeight,
                                // backgroundColor:(news.id%2==0? 'red':'green')
                                
                                }}>
      <Image source={{ uri: news.image.image }} style={{ height: 200, marginBottom: 20 }} />
      <View className="px-4">
        <ThemedText type="subtitle" style={{ marginBottom: 15 }}>{news.title}</ThemedText>


        <ThemedText>{news.description}</ThemedText>

        {
          news.source_link && 1 &&

          <Text
            className="dark:text-gray-100"
            style={{ marginTop: 20 }}
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

          >{ 
            
            showTimeAgo(news.created_at) + " | " + getDomain(news.source_link)}

          </Text>



        }

      </View>

    </View>
  )

}
