import BackButton from '@/components/BackButton';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const WebPage = () => {
  
  const param = useLocalSearchParams()

  useEffect(() => {
    const onBackPress = () => {
            router.push("/settings");
            return true;
          };

          const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
                return () => backHandler.remove();
                
    }, [param.url]);
  return (
    
    <SafeAreaProvider>
    <SafeAreaView style={{ flex:1 }}>
       <BackButton screen='/settings'/>
    <WebView className='mt-24'
    key={param.url}
      source={{ uri: param.url }}
    />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default WebPage