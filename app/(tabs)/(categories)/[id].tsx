import {  NewsScrollView } from '@/components/NewsScrollView';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  // alert("https://newspepperapp.in/api/blogs?category_id="+id);

  
  return (
    <SafeAreaProvider>
      <SafeAreaView >

 <NewsScrollView baseUrl={"https://newspepperapp.in/api/blogs?category_id="+id} />
 
        </SafeAreaView>
    </SafeAreaProvider>
    
  )
}
