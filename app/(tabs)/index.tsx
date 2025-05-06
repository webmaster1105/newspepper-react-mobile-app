import CategoryGrid from '@/components/CategoryGrid';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [text, onChangeText] = React.useState('');


  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(user)
    } catch (e) {
      alert('storage empty')
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get("https://newspepperapp.in/api/blogs?is_featured=1");
      setBlogs(response.data.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    fetchCategories();
    fetchFeaturedBlogs();
    
  }, []);
  return (
    <SafeAreaProvider>

      <SafeAreaView style={{ padding: 20 }}>
        <TextInput

          placeholder='Search'
          placeholderTextColor={'gray'}
          clearButtonMode='always'
          onChangeText={onChangeText}
          value={text}
          className="px-4 py-4 mb-8 rounded-lg border border-gray-300 text-lg dark:text-gray-50"


        />

        <ThemedText type="subtitle">For You</ThemedText>


        <View className="flex flex-row my-10 ">
          <View className='w-1/3 items-center '>
          <Link href="/(news)" className='dark:text-gray-100'>
            <FontAwesome size={48} name="newspaper-o"/>
            </Link>
            <ThemedText>All News</ThemedText>
            
          </View>
          <View className='w-1/3 items-center'>
          <Link href="/(news)" className='dark:text-gray-100'>
            <FontAwesome size={48} name="feed" />
            </Link>
            <ThemedText>My Feed</ThemedText>
          </View>
          <View className='w-1/3 items-center'>
          <Link href="/search" className='dark:text-gray-100'>
            <FontAwesome size={48} name="search" />
            </Link>
            <ThemedText>Search</ThemedText>
          </View>
        </View>

        <ThemedText type="subtitle">Filter By Topic</ThemedText>

        <CategoryGrid categories={categories} />

      </SafeAreaView>
    </SafeAreaProvider>

  )
}
