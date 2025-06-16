import { RootState } from '@/store/store';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

const Source = () => {
  
  const param = useLocalSearchParams()
  const news = useSelector((state: RootState) => state.news) 
  const dispatch = useDispatch();

  // useFocusEffect(
  //     useCallback(() => {


       
  //       // Optional: cleanup when screen is unfocused
  //       return () => {
  //       };
  //     }, [param.url])
  //   );
  
  return (
    
    <SafeAreaProvider>
    <SafeAreaView style={{ flex:1 }}>
    <WebView 
      source={{ uri: param.url }}
    />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Source