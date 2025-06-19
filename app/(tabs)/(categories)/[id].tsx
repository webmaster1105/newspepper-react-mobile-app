import { NewsScrollView } from '@/components/NewsScrollView';
import { RootState } from '@/store';
import { fetchNews } from '@/store/NewsSlice';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { AppState, BackHandler } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function DetailsScreen() {
  const { id,name ,fromHome} = useLocalSearchParams();
  const url = id ? "https://newspepperapp.in/api/blogs?category_id="+id : "https://newspepperapp.in/api/blogs";



  const news = useSelector((state: RootState) => state.news)

  const dispatch = useDispatch();

   const [refreshing, setRefreshing] = useState(false);
  
    const [appState, setAppState] = useState(AppState.currentState);


 useFocusEffect(

    useCallback(() => {
     // console.log("on focous news page", fromHome, news.items.length)
    //  console.log("data from id page",id,name,fromHome)
    //  if (fromHome) fetchData(url);

      
      // Optional: cleanup when screen is unfocused

      const onBackPress = () => {
        router.push("home");
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();

    }, [id])
  );



  

 





 

  useEffect(() => {

    // if (!isFromHome) 
      fetchData(url);

    const subscription = AppState.addEventListener("change", nextAppState => {
     // setAppState(nextAppState);
      if (nextAppState === 'background') {
        // App is in background
        console.log("app in background")
        //setTimeout(() => { onRefresh(); console.log("on refresh called")}, 180000);

      } else if (nextAppState === 'active') {
        // App is in foreground
      }
    });




    
      // const onBackPress = () => {
      //   router.push("home");
      //   return 1;
      // };

      // const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      // return () => backHandler.remove();


  }, [id,fromHome]);

  const fetchData = (url: string) => {

    dispatch(fetchNews(url))
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(url);


    // Simulate fetching new data (e.g., from API)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  
  return (
    <SafeAreaProvider>
      <SafeAreaView >
 <NewsScrollView url={url} isFromHome={true}/>
 
        </SafeAreaView>
    </SafeAreaProvider>
    
  )
}
