import BackButton from '@/components/BackButton';
import { NewsScrollView } from '@/components/NewsScrollView';
import { fetchNews } from '@/store/NewsSlice';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { AppState, BackHandler } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function DetailsScreen() {
  const { id,name ,fromHome, searchURL,index=0} = useLocalSearchParams();
  let url = id ? "https://newspepperapp.in/api/blogs?category_id="+id : "https://newspepperapp.in/api/blogs";
  // const defaultIndex = parseInt(index);
  



  // const news = useSelector((state: RootState) => state.news)

  const dispatch = useDispatch();

  //  const [refreshing, setRefreshing] = useState(false);
  
  //   const [appState, setAppState] = useState(AppState.currentState);


 useFocusEffect(

    useCallback(() => {

      const onBackPress = () => {
        if(index) router.push("/(tabs)/search");
        else router.push("/(tabs)");
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();

    }, [id,index])
  );



  

 





 

  useEffect(() => {
    if (searchURL) url = searchURL; 
     
      if(!index)fetchData(url);
 
    const subscription = AppState.addEventListener("change", nextAppState => {
     // setAppState(nextAppState);
      if (nextAppState === 'background') {
        // App is in background
        console.log("app in background")
        setTimeout(() => { 
          router.push({
                    pathname: "/(tabs)/(categories)/[id]",
                    params: { id:id, fromHome:Math.random()}
                  })
 

          
        }, 6000);

      } else if (nextAppState === 'active') {
        // App is in foreground
      }
    });




    


  }, [fromHome,index,id]);

  const fetchData = (url: string) => {

if( id!=undefined) dispatch(fetchNews(url))
  };

  


  
  return (
    <SafeAreaProvider>
      <SafeAreaView >
        <BackButton screen='/(tabs)'/>
 <NewsScrollView url={url} isFromHome={true} onRefresh={()=>fetchData(url)} index={parseInt(index)}/>
 
        </SafeAreaView>
    </SafeAreaProvider>
    
  )
}
