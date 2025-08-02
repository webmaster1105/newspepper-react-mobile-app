import BackButton from '@/components/BackButton';
import { News } from '@/components/News';
import NewsScrollList from '@/components/NewsScrollList';
import { stopSpeaking } from '@/scripts/TextToSpeech';
import { RootState } from '@/store';
import { fetchNews, fetchNewsNextPage } from '@/store/NewsSlice';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, BackHandler, RefreshControl, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function DetailsScreen() {
  const { id, name, fromHome, searchURL, index } = useLocalSearchParams();
  let url = id ? "https://newspepperapp.in/api/blogs?category_id=" + id : "https://newspepperapp.in/api/blogs";


  const news = useSelector((state: RootState) => state.news)
  const { height } = useWindowDimensions();



  const dispatch = useDispatch();

  useFocusEffect(

    useCallback(() => {

      // console.log(int(height*0.4))

      const onBackPress = () => {
        stopSpeaking()
        if (index) router.push("/(tabs)/search");
        else router.push("/(tabs)");
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    

    }, [id, index])
  );



  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);

  const handleAppStateChange = (nextState: AppStateStatus) => {
    if (appState.current === 'active' && nextState === 'background') {
       stopSpeaking()
      backgroundTime.current = Date.now();
    }

    if (
      appState.current.match(/background|inactive/) &&
      nextState === 'active'
    ) {
      const now = Date.now();
      if (backgroundTime.current && now - backgroundTime.current > 180000) {
        if (!index) fetchData(url)

      }
      backgroundTime.current = null;
    }

    appState.current = nextState;
  };







  useEffect(() => {
    if (searchURL) url = searchURL;

    if (!index) fetchData(url);

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => subscription.remove();

  }, [fromHome, index, id]);

  const fetchData = (url: string) => {

    if (id != undefined) {
      console.log('fetch data called')
      dispatch(fetchNews(url))}
  };





  return (
    <SafeAreaProvider>
      <SafeAreaView >
        <BackButton screen={index == 0 ? '/(tabs)' : '/(tabs)/search'} />
        <NewsScrollList
          isLoading={news.loading}
          data={news.items}
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

          onEndReached={() => { if (news.nextPageUrl) dispatch(fetchNewsNextPage(news.nextPageUrl)) }}
          onEndReachedThreshold={0.4}
          keyExtractor={(item, index) => String(index)}
          refreshControl={
            <RefreshControl refreshing={false}
              onRefresh={() => dispatch(fetchNews(url))}
            />
          }

        />
      </SafeAreaView>
    </SafeAreaProvider>

  )
}
