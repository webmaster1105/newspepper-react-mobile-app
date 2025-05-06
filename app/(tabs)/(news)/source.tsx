import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const Source = () => {
  
  const param = useLocalSearchParams()
  console.log(param.url)
  
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