import BackButton from '@/components/BackButton';
import { News } from '@/components/News';
import NewsScrollList from '@/components/NewsScrollList';
import { SavedNews } from '@/scripts/SavedNews';
import { stopSpeaking } from '@/scripts/TextToSpeech';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus, BackHandler, RefreshControl, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SavedNewsScrollList() {
  const { index } = useLocalSearchParams();
   const { height } = useWindowDimensions();

   const handleAppStateChange = (nextState: AppStateStatus) => {
          stopSpeaking()
       }

 

   const [loading, setLoading] = useState(true);
         const [bookmarkedNews, setBookmarkedNews] = useState<any[]>([])
   
         const getSavedNews = async () => {
               const news = await SavedNews.getList()
               setBookmarkedNews(news)
               setLoading(false);
         }
   
   
         useEffect(() => {
               getSavedNews()
               const subscription = AppState.addEventListener("change", handleAppStateChange)
               
                   return () => subscription.remove();
               
         }, [index]);

  
  useFocusEffect(

    useCallback(() => {

      const onBackPress = () => {
        stopSpeaking()
        router.push("/(tabs)/settings");
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
              stopSpeaking()
              backHandler.remove();
            }

    }, [index])
  );





  

  return (
    <SafeAreaProvider>
      <SafeAreaView >
        <BackButton screen={ '/(tabs)/settings'} />
        <NewsScrollList
          isLoading={loading}
          data={bookmarkedNews}
          index={index}
          renderItem={({ item }) => (<News news={item} />)}
          onScrollBeginDrag={stopSpeaking}
          
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        getItemLayout={(data, index) => (
          { length: height, offset: height * index, index }
        )}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          refreshControl={
            <RefreshControl refreshing={false}
              onRefresh={() => console.log("refreshed")}
            />
          }

        />
      </SafeAreaView>
    </SafeAreaProvider>

  )
}
