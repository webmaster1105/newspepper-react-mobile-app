import { NewsScrollView } from '@/components/NewsScrollView';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Index = () => {
  
  return (
    

<SafeAreaProvider>
<SafeAreaView style={{ flex:1 }}>

<NewsScrollView baseUrl={"https://newspepperapp.in/api/blogs"}/>

  </SafeAreaView>
</SafeAreaProvider>
    
  )
}



export default Index