import CategoryGrid from '@/components/CategoryGrid';
import { ThemedText } from '@/components/ThemedText';
import type { RootState } from '@/store';
import { resetNews } from '@/store/NewsSlice';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
  const [text, onChangeText] = React.useState('');
  const { t } = useTranslation();

  const news = useSelector((state: RootState) => state.news) 
  const dispatch = useDispatch()

   useFocusEffect(
      useCallback(() => {
        // Reset state when screen is focused
       console.log("focous on home pagr", news.items.length)
        dispatch(resetNews()) 
  
        const onBackPress = () => {
                //navigation.replace('Home');
                BackHandler.exitApp();
                return true;
              };
        
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        // Optional: cleanup when screen is unfocused
        return () => {
           dispatch(resetNews()) 
           backHandler.remove();
        //dispatch(resetNews()) 
        console.log("return on home page", news.items.length)
        };
      }, [])
    );

  // const getUser = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('user');
  //     const user = jsonValue != null ? JSON.parse(jsonValue) : null;
  //     console.log(user)
  //   } catch (e) {
  //     alert('storage empty')
  //   }
  // };

  // const fetchFeaturedBlogs = async () => {
  //   try {
  //     const response = await axios.get("https://newspepperapp.in/api/blogs?is_featured=1");
  //     setBlogs(response.data.data.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://newspepperapp.in/api/categories");
      setCategories(response.data.data);
      // console.log(response.data.data[0].blogs)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
     dispatch(resetNews()) 
    fetchCategories();
    //fetchFeaturedBlogs();
    
  }, []);
  return (
    <SafeAreaProvider>

      <SafeAreaView style={{ padding: 20 }}>
                
              
             
        <TextInput

          placeholder={t('search')}
          placeholderTextColor={'gray'}
          clearButtonMode='always'
          onChangeText={onChangeText}
          value={text}
          className="px-4 py-4 mb-8 rounded-lg border border-gray-300 text-lg dark:text-gray-50"


        />

        <ThemedText type="subtitle" className='dark:text-gray-300'>{t('for_you')}</ThemedText>


        <View className="flex flex-row my-8 ">
          <View className='w-1/3 items-center '>
          <Link  
          href={{
          pathname: "/(categories)/[id]",
          params: { id: 0 , fromHome:"true"}
        }}
          className='dark:text-gray-300'>
            <FontAwesome size={36} name="newspaper-o"/>
            </Link>
            <ThemedText className='dark:text-gray-300'>{t('all_news')}</ThemedText>
            
          </View>
          <View className='w-1/3 items-center'>
          <Link href={{
          pathname: "/(categories)/[id]",
          params: { id: 0 , fromHome:"true"}
        }}
         className='dark:text-gray-300'>
            <FontAwesome size={36} name="feed" />
            </Link>
            <ThemedText className='dark:text-gray-300'>{t('my_feed')}</ThemedText>
          </View>
          <View className='w-1/3 items-center'>
          <Link href="/search" className='dark:text-gray-300'>
            <FontAwesome size={36} name="search" />
            </Link>
            <ThemedText className='dark:text-gray-300'>{t('search')}</ThemedText>
          </View>
        </View>

        <ThemedText type="subtitle" className='dark:text-gray-300'>{t('filter_by_topic')}</ThemedText>

        <CategoryGrid categories={categories} />





      </SafeAreaView>
    </SafeAreaProvider>

  )
}
