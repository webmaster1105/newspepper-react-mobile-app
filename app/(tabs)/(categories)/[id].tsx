import BackButton from '@/components/BackButton';
import { NewsScrollView } from '@/components/NewsScrollView';
import { fetchNews } from '@/store/NewsSlice';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, BackHandler } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function DetailsScreen() {
  const { id,name ,fromHome, searchURL,index} = useLocalSearchParams();
  let url = id ? "https://newspepperapp.in/api/blogs?category_id="+id : "https://newspepperapp.in/api/blogs";
  
  
  // const defaultIndex = parseInt(index);
  


  const dispatch = useDispatch();

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



  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);

const handleAppStateChange = (nextState: AppStateStatus) => {
    if (appState.current === 'active' && nextState === 'background') {
      backgroundTime.current = Date.now();
    }

    if (
      appState.current.match(/background|inactive/) &&
      nextState === 'active'
    ) {
      const now = Date.now();
      if (backgroundTime.current && now - backgroundTime.current > 6000) {
if(!index)fetchData(url)
console.log("resume",index)

      }
      backgroundTime.current = null;
    }

    appState.current = nextState;
  }; 





 

  useEffect(() => {
    if (searchURL) url = searchURL; 
     
      if(!index)fetchData(url);

 
//     const subscription = AppState.addEventListener("change", nextAppState => {
//      // setAppState(nextAppState);
//       if (nextAppState === 'background') {
//         // App is in background
//         console.log("app in background")
//        const timeout = setTimeout(() => { 
//           console.log("after timeouut ", id)
//           // router.push({
//           //           pathname: "/(tabs)/(categories)/[id]",
//           //           params: { id:id, fromHome:Math.random()}
//           //         })

//           fetchData(url)
 
//  clearTimeout(timeout)
          
//         }, 6000);

//       } else if (nextAppState === 'active') {
//         // App is in foreground
//       }
//     });

const subscription = AppState.addEventListener("change", handleAppStateChange)


    
return () => subscription.remove();

  }, [fromHome,index,id]);

  const fetchData = (url: string) => {

if( id!=undefined) dispatch(fetchNews(url))
  };

  


  
  return (
    <SafeAreaProvider>
      <SafeAreaView >
        <BackButton screen={index==0? '/(tabs)' : '/(tabs)/search'}/>
 <NewsScrollView url={url} isFromHome={true} onRefresh={()=>fetchData(url)} index={parseInt(index)}/>
 
        </SafeAreaView>
    </SafeAreaProvider>
    
  )
}
