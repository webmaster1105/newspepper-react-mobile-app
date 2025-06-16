import { NewsList } from '@/components/NewsList';
import { ThemedText } from '@/components/ThemedText';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [text, onChangeText] = React.useState('');

const { t } = useTranslation();
  

 


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

        <ThemedText type="subtitle" className='mb-4'>{t('latest_news')}</ThemedText>

<NewsList baseUrl={"https://newspepperapp.in/api/blogs"}/>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default Search