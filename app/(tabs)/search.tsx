import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import CategoryGrid from '@/components/CategoryGrid';
import { Link } from 'expo-router';
import { NewsList } from '@/components/NewsList';

const Search = () => {
  const [text, onChangeText] = React.useState('');


  

 


  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
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
          className="px-3 py-3 mb-8 rounded-lg border border-gray-300 dark:text-gray-50"


        />

        <ThemedText type="subtitle" className='mb-4'>Latest News</ThemedText>

<NewsList baseUrl={"https://newspepperapp.in/api/blogs"}/>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default Search