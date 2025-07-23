import { NewsList } from '@/components/NewsList';
import SearchField from '@/components/SearchField';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const Search = () => {
const { t } = useTranslation();
const { query} = useLocalSearchParams();
 const dispatch = useDispatch();

const handleOnSearch = (q) =>
{
  
  setSearchText(q)
}
  

 


  const [searchText, setSearchText] = useState(query || '');
  useEffect(() => {
  }, [searchText,query]);
  return (
    <SafeAreaProvider>

      <SafeAreaView style={{ padding: 20 }}>
         <SearchField onSearch={(q)=>handleOnSearch(q)} value={searchText}/>

        <ThemedText type="subtitle" className='mb-4 hidden'>{t('latest_news')}</ThemedText>
<View className="p-4">
<NewsList  url={"https://newspepperapp.in/api/blogs?s="+searchText} />
</View>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default Search